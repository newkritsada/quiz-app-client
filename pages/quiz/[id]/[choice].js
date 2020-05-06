import Link from "next/link";
import { useEffect, Component } from "react";
import { withRouter, useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import Axios from "axios";
import { API } from "../../../src/config/api";
import LoaderComponent from "../../../src/components/Loader";
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

class Doit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      quizId: 1,
      choiceId: 1,
      playerId: 0,
      playerName: "",
      articleId: 0,
      question: "",
      choice: [
        {
          id: 1,
          answer: "",
        },
        {
          id: 2,
          answer: "",
        },
        {
          id: 3,
          answer: "",
        },
        {
          id: 4,
          answer: "",
        },
      ],
      lastQuestion: false,
    };
  }

  Loader = (status) => {
    this.setState({
      isLoading: status,
    });
  };

  fetchData = (id, choiceId) => {
    console.log(choiceId);
    this.Loader(true);

    let data = Axios.get(`${API.QUIZ}/${id}`)
      .then((res) => {
        // console.log("\n== Res ==\n", res);

        if (choiceId == res.data.quize[0].articles.length) {
          this.setState({
            lastQuestion: true,
          });
        }
        this.setState({
          quizId: res.data.quize[0].id,
          articleId: res.data.quize[0].articles[choiceId - 1].id,
          question: res.data.quize[0].articles[choiceId - 1].question,
          choice: res.data.quize[0].articles[choiceId - 1].choices,
        });
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
    let { query } = Router.router;

    // console.log("\n== query ==\n", query);
    this.setState({
      quizId: parseInt(query.id),
      choiceId: parseInt(query.choice),
      playerId: query.playerId,
      playerName: query.playerName,
    });
    this.fetchData(query.id, parseInt(query.choice));
  }

  componentWillReceiveProps(nextProps) {
    let { query } = nextProps.router;
    // console.log("\n== query ==\n", query);
    this.setState({
      quizId: parseInt(query.id),
      choiceId: parseInt(query.choice),
      playerId: query.playerId,
      playerName: query.playerName,
    });
    this.fetchData(query.id, parseInt(query.choice));
  }

  sendAnswer = (choice) => {
    let { quizId, choiceId, articleId, playerId, lastQuestion } = this.state;
    let data = {
      player_id: playerId,
      answer_id: choice,
      article_id: articleId,
    };
    if (lastQuestion) {
      Router.push({
        pathname: `/quiz/${quizId}`,
      });
    }
    Axios.post(`${API.PLAY}/${quizId}`, data)
      .then((res) => {
        // console.log("\n== Res ==\n", res);

        Router.push({
          pathname: `/quiz/${id}/${choiceId + 1}`,
          query: { playerName: res.data.result.name, playerId: res.data.result.id },
        });
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          this.Loader(false);
        }, 1000);
      });
  };

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

  _onSubmit = () => {
    this.fetchData();
  };

  render() {
    let { quizId, choiceId, isLoading, question, choice } = this.state;

    return this.state.isLoading ? (
      <LoaderComponent />
    ) : (
      <Layout>
        <div className="d-flex justify-content-center">
          <Form className="list-bg p-4 mt-5 quiz-form">
            <h3>
              {choiceId}. {question}
            </h3>
            <Row className="mt-5">
              {choice.map((value, index) => {
                return (
                  <Col md={6} className="p-1 text-center d-flex flex-column justify-content-center">
                    <button
                      type="button"
                      className="btn btn-secondary ml-2 mr-2 mb-5 choice-btn"
                      onClick={() => this.sendAnswer(value.id)}
                    >
                      {value.answer}
                    </button>
                  </Col>
                );
              })}
            </Row>
            <Link href="/">
              <button type="button" className="btn btn-secondary m-3 create-cancel">
                Back
              </button>
            </Link>
          </Form>
        </div>
      </Layout>
    );
  }
}
export default withRouter(Doit);
