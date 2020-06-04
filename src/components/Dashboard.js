import React, { Component } from "react";
import Header from "./Header";
import Table from "./Table";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <br />
        <Table />
      </div>
    );
  }
}
