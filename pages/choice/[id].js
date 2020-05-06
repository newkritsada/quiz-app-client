import Link from "next/link";
import { useEffect, Component } from "react";
import { withRouter, useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import Axios from "axios";
import { API } from "../../src/config/api";
import LoaderComponent from "../../src/components/Loader";
import Router from "next/router";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col,
} from "reactstrap";

class Choice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      id: 1,
      quizId: "",
      question: "",
      choice: [
        {
          answer: "",
          status: 1,
        },
        {
          answer: "",
          status: 0,
        },
        {
          answer: "",
          status: 0,
        },
        {
          answer: "",
          status: 0,
        },
      ],
    };
  }

  Loader = (status) => {
    this.setState({
      isLoading: status,
    });
  };

  fetchData = (path) => {
    this.Loader(true);

    let { id, quizId, question, choice } = this.state;

    if (!question) Router.push({ pathname: `/` });

    let data = Axios.post(`${API.ARTICLE}/${quizId}`, { article: [{ question, choice }] })
      .then((res) => {
        // console.log("\n== Res ==\n", res);
        if (path == "REDIRECT") Router.push({ pathname: `/` });
        else Router.push({ pathname: `/choice/${id + 1}`, query: { quizId: quizId } });
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          this.Loader(false);
        }, 1000);
      });
  };

  componentWillReceiveProps(nextProps) {
    this.Loader(true);
    let { query } = nextProps.router;

    this.setState({
      id: parseInt(query.id),
      quizId: query.quizId,
    });
    setTimeout(() => {
      this.Loader(false);
    }, 1000);
  }

  _onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  _onChoiceChange = (e, i) => {
    let choice = [...this.state.choice];
    choice[i].answer = e.target.value;
    this.setState({
      choice: choice,
    });
  };

  _onSelect = (i) => {
    let choice = [...this.state.choice];
    choice = choice.map((value, index) => {
      if (index == i) {
        value.status = 1;
      } else {
        value.status = 0;
      }
      return value;
    });

    this.setState({
      choice: choice,
    });
  };

  _onSubmit = (path = null) => {
    this.fetchData(path);
  };

  render() {
    let { id, isLoading, question, choice } = this.state;
    return isLoading ? (
      <LoaderComponent />
    ) : (
      <Layout>
        <div className="d-flex justify-content-center">
          <Form className="list-bg p-4 mt-5 quiz-form">
            <FormGroup className="d-flex">
              <Label for="question" className="mr-1">
                <h4>{`${id}. `}</h4>
              </Label>
              <Input
                type="input"
                name="question"
                id="question"
                placeholder="Question"
                value={question}
                onChange={this._onChange}
              />
            </FormGroup>
            <Row>
              {choice.map((value, index) => {
                return (
                  <Col md={6} className="p-1">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Input
                            addon
                            type="checkbox"
                            aria-label="Checkbox for following text input"
                            checked={value.status}
                            onChange={() => this._onSelect(index)}
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="input"
                        name="answer"
                        id={index}
                        placeholder="Answer"
                        value={value.answer}
                        onChange={(e) => this._onChoiceChange(e, index)}
                      />
                    </InputGroup>
                  </Col>
                );
              })}
            </Row>

            <div className="d-flex justify-content-center pl-4 pr-4">
              <button
                type="button"
                className="btn btn-primary ml-2 mr-2 mt-2 mb-5 "
                onClick={() => this._onSubmit("REDIRECT")}
              >
                Complete!
              </button>

              <button type="button" className="btn btn-primary ml-2 mr-2 mt-2 mb-5 " onClick={this._onSubmit}>
                {"Next ->"}
              </button>
            </div>
          </Form>
        </div>
      </Layout>
    );
  }
}
export default withRouter(Choice);
