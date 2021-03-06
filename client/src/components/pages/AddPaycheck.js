import React, { Component } from "react";
import { Container, Message } from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";
import Paycheck from "../forms/paycheck/Paycheck";
import { getCurrentPaychecks } from "../../actions/paycheckActions";

class AddPaycheck extends Component {
  render() {
    const { currentPaychecks } = this.props;

    return (
      <Container>
        {currentPaychecks.paychecks.length >= 1 ? (
          ""
        ) : (
          <Message warning header="Enter your first paycheck to get started!" />
        )}
        <Paycheck />
      </Container>
    );
  }
}

function mapStateToProps({ currentPaychecks }) {
  return { currentPaychecks };
}

export default connect(mapStateToProps, { getCurrentPaychecks })(AddPaycheck);
