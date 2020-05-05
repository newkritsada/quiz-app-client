import Link from "next/link";
import { useEffect, Component } from "react";
import { withRouter, useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import Axios from "axios";
import { API } from "../../src/config/api";
import LoaderComponent from "../../src/components/Loader";
import { Row, Col, Container, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      page: 1,
      data: [
        { name: "Mavis", point: 0 },
        { name: "Sleeper", point: 10 },
        { name: "Keeper", point: 9 },
      ],
    };
  }

  Loader = (status) => {
    this.setState({
      isLoading: status,
    });
  };

  fetchData = (index = 1) => {
    let data = Axios.get(API.QUIZ, {
      params: {
        page: index,
        items: 10,
      },
    })
      .then((res) => {
        console.log("\n== Res ==\n", res);
        this.Loader(false);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          this.Loader(false);
        }, 1000);
      });
  };

  componentDidMount() {
    this.Loader(true);
    this.fetchData();

    // let d = [];
    // for (let index = 0; index < 17; index++) {
    //   d.push("This is Test" + index);
    // }
    // this.setState({
    //   data: d,
    // });
  }

  changePaginate = (i) => {
    if (i <= 1) i = 1;
    if (i >= 5) i = 5;
    this.fetchData(i);
    this.setState({
      page: i,
    });
  };

  render() {
    let {page, data, isLoading } = this.state;

    return this.state.isLoading ? (
      <LoaderComponent />
    ) : (
      <Layout>
        <h1 className="d-flex justify-content-center">ชื่อ Quiz: สร้างโดย</h1>
        <Row>
          <Col md={12} className="d-flex justify-content-between pt-5 pb-3">
            <Link href={{ pathname: `/createQuiz` }}>
              <button type="button" className="btn btn-primary create">
                Do it!
              </button>
            </Link>
            <Link href={{ pathname: `/createQuiz` }}>
              <button type="button" className="btn btn-primary create">
                Delete
              </button>
            </Link>
          </Col>
        </Row>
        <Container className="list-bg">
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
        </Container>
      </Layout>
    );
  }
}
export default withRouter(Quiz);
