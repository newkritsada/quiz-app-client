import Link from "next/link";
import { useEffect, Component } from "react";
import { withRouter, useRouter } from "next/router";
import Layout from "../src/components/Layout";
import Axios from "axios";
import { API } from "../src/config/api";
import LoaderComponent from "../src/components/Loader";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Router from "next/router";

class CreateQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      id: 1,
      data: {
        quizName: "",
        createName: "",
        deleteCode: "",
        status: 1,
      },
    };
  }

  fetchData = () => {
    this.Loader(true);
    let { quizName, createName, deleteCode, status } = this.state.data;
    let data = {
      creator: createName,
      quize_name: quizName,
      code_for_delete: deleteCode,
      status,
    };

    Axios.post(API.QUIZ, data)
      .then((res) => {
        // console.log("\n== Res ==\n", res);
        this.setState({
          id: res.data.result.id,
        });

        Router.push({ pathname: `/choice/1`, query: { quizId: res.data.result.id } });
        // return <Link href={{ pathname: `/choice/1`, query: { quizId: res.data.result.id, } }}  />;
        // this.Loader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  Loader = (status) => {
    this.setState({
      isLoading: status,
    });
  };


  componentWillReceiveProps(nextProps) {
    let { query } = nextProps.router;
  }

  _onChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  _onSubmit = () => {
    console.log("Click! Click!! Click!!!");
    this.fetchData();
  };

  render() {
    let { id, data, isLoading } = this.state;
    return this.state.isLoading ? (
      <LoaderComponent />
    ) : (
      <Layout>
        <div className="d-flex justify-content-center">
          <Form className="list-bg p-4 mt-5 quiz-form" onSubmit={this._onSubmit}>
            <FormGroup>
              <Label for="quizName">
                <h4>Quiz Name</h4>
              </Label>
              <Input
                type="input"
                name="quizName"
                id="quizName"
                placeholder="Quiz Name"
                value={data.quizName}
                onChange={this._onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="createName">
                <h4>Creator Name</h4>
              </Label>
              <Input
                type="input"
                name="createName"
                id="createName"
                placeholder="Creator Name"
                value={data.createName}
                onChange={this._onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="deleteCode">
                <h4>Delete Code</h4>
              </Label>
              <Input
                type="input"
                name="deleteCode"
                id="deleteCode"
                placeholder="123456789"
                value={data.deleteCode}
                onChange={this._onChange}
              />
            </FormGroup>
            <FormGroup tag="fieldset">
              <legend>Privacy</legend>
              <FormGroup check>
                <Input
                  type="radio"
                  name="status"
                  value={1}
                  onChange={this._onChange}
                  checked={data.status == 1 ? true : false}
                />{" "}
                <h5>Public</h5>
              </FormGroup>
              <FormGroup check>
                <Input
                  type="radio"
                  name="status"
                  value={0}
                  onChange={this._onChange}
                  checked={data.status == 0 ? true : false}
                />{" "}
                <h5>Private</h5>
              </FormGroup>
            </FormGroup>

            <div className="d-flex flex-row-reverse">
              {/* <Link href={{ pathname: `/choice/1`, query: { quizId: id } }} onClick={this._onSubmit}> */}
              <button type="button" className="btn btn-primary ml-2 mr-2 mb-5 create-next" onClick={this._onSubmit}>
                Next ->
              </button>
              {/* </Link> */}
              <Link href="/">
                <button type="button" className="btn btn-secondary ml-2 mr-2 mb-5 create-cancel">
                  Cancel
                </button>
              </Link>
            </div>
          </Form>
        </div>
      </Layout>
    );
  }
}
export default withRouter(CreateQuiz);
