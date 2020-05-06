import Link from "next/link";
import { useEffect, Component } from "react";
import { withRouter, useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import Axios from "axios";
import { API } from "../../src/config/api";
import LoaderComponent from "../../src/components/Loader";
import Router from "next/router";

import {
  Alert,
  Row,
  Col,
  Container,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import QuizModal from "../../src/components/QuizModal";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      modal: false,
      doItModal: false,
      visible: false,
      id: 1,
      page: 1,
      perPage: 10,
      quizName: "quiz Name",
      creatorName: "creator Name",
      code: "1234",
      name: "baba",
      data: [
        // { id: 1, name: "", point: 0 }
      ],
      status: "You don't have permission",
    };
  }

  Loader = (status) => {
    this.setState({
      isLoading: status,
    });
  };

  fetchData = (id, page = 1, perPage = 10) => {
    this.Loader(true);

    Axios.get(`${API.LEADER_BOARD}/${id}`, {
      params: {
        page: page,
        perPage: perPage,
      },
    })
      .then((res) => {
        // console.log("\n== Res ==\n", res);
        this.setState({
          data: res.data.leaderboard,
        });
        this.Loader(false);
      })
      .catch((err) => {
        console.log(err);
        this.Loader(false);
      });

    Axios.get(`${API.QUIZ}/${id}`)
      .then((res) => {
        // console.log("\n== Res ==\n", res);
        this.setState({
          quizName: res.data.quize[0].quize_name,
          creatorName: res.data.quize[0].creator,
        });
        this.Loader(false);
      })
      .catch((err) => {
        console.log(err);
        this.Loader(false);
      });
  };

  doIt = () => {
    let { id, name } = this.state;
    let body = {
      player: name,
      quiz_id: id,
    };
    Axios.post(`${API.CREATE_PLAYER}`, body)
      .then((res) => {
        // console.log("\n== Res ==\n", res);

        Router.push({
          pathname: `/quiz/${id}/1`,
          query: { playerName: res.data.result.name, playerId: res.data.result.id },
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          visible: true,
        });
      });
  };

  delete = async () => {
    let { id, code } = this.state;
    this.setState({
      modal: !this.state.modal,
    });
    let data = await Axios.delete(`${API.QUIZ}/${id}/${code}`)
      .then((res) => {
        Router.push({ pathname: `/` });

        this.Loader(false);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          visible: true,
        });
      });
  };

  componentDidMount() {
    
    let { query } = Router.router;
    // console.log("\n== query ==\n", Router.router.query);
    this.setState({
      id: parseInt(query.id),
    });
    this.fetchData(query.id);
  }

  componentWillReceiveProps(nextProps) {
    let { query } = nextProps.router;
    // console.log("\n== query ==\n", query);
    this.setState({
      id: parseInt(query.id),
    });
    this.fetchData(query.id);
  }

  changePaginate = (i) => {
    if (i <= 1) i = 1;
    if (i >= 5) i = 5;
    this.fetchData(id, i);
    this.setState({
      page: i,
    });
  };

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  doItToggle = () => {
    this.setState({
      doItModal: !this.state.doItModal,
    });
  };

  onDismiss = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let {
      id,
      page,
      data,
      isLoading,
      modal,
      doItModal,
      quizName,
      creatorName,
      code,
      name,
      visible,
      status,
    } = this.state;

    return isLoading ? (
      <LoaderComponent />
    ) : (
      <Layout>
        <Alert color="danger" isOpen={visible} toggle={this.onDismiss}>
          {status}
        </Alert>
        {/* Modal Do it */}
        <QuizModal
          isOpen={doItModal}
          toggle={this.doItToggle}
          header={quizName}
          labelName="Player Name"
          name="name"
          id="name"
          placeholder="Player Name"
          value={name}
          onChange={this._onChange}
          color="primary"
          buttonName="Do it!"
          onClick={this.doIt}
        />
        {/* Modal Delete */}

        <QuizModal
          isOpen={modal}
          toggle={this.toggle}
          header={quizName}
          labelName="Code"
          name="code"
          id="code"
          placeholder="code to delete"
          value={code}
          onChange={this._onChange}
          color="danger"
          buttonName="Delete"
          onClick={this.delete}
        />

        <h1 className="d-flex justify-content-center">
          ชื่อ {quizName}: สร้างโดย {creatorName}
        </h1>
        <Row>
          <Col md={12} className="d-flex justify-content-between pt-5 pb-3">
            <button type="button" className="btn btn-primary create" onClick={this.doItToggle}>
              Do it!
            </button>

            <button type="button" className="btn btn-danger create" onClick={this.toggle}>
              Delete
            </button>
          </Col>
        </Row>
        <Container className="list-bg mb-5">
          <Table borderless>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th></th>
                <th>Point</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{value.name}</td>
                    <td></td>
                    <td>{value.point}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
        <Container className="text-center">
          <div className="d-flex justify-content-center">
            <Pagination size="lg" aria-label="Page navigation example">
              <PaginationItem>
                <PaginationLink first onClick={() => this.changePaginate(1)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink previous onClick={() => this.changePaginate(page - 1)} />
              </PaginationItem>
              <PaginationItem active={page == 1 ? true : false}>
                <PaginationLink onClick={() => this.changePaginate(1)}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem active={page == 2 ? true : false}>
                <PaginationLink onClick={() => this.changePaginate(2)}>2</PaginationLink>
              </PaginationItem>
              <PaginationItem active={page == 3 ? true : false}>
                <PaginationLink onClick={() => this.changePaginate(3)}>3</PaginationLink>
              </PaginationItem>
              <PaginationItem active={page == 4 ? true : false}>
                <PaginationLink onClick={() => this.changePaginate(4)}>4</PaginationLink>
              </PaginationItem>
              <PaginationItem active={page == 5 ? true : false}>
                <PaginationLink onClick={() => this.changePaginate(5)}>5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next onClick={() => this.changePaginate(page + 1)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last onClick={() => this.changePaginate(5)} />
              </PaginationItem>
            </Pagination>
          </div>
          <Link href="/">
            <button type="button" className="btn btn-secondary m-5 create-cancel">
              Back
            </button>
          </Link>
        </Container>
      </Layout>
    );
  }
}
export default withRouter(Quiz);
