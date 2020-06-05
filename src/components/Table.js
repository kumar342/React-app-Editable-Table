import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import data from "../data/dataStore.js";
import ReactModal from "react-modal";
import { FormGroup, Label, Input } from "reactstrap";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      orderId: "",
      customerName: "",
      customerEmail: "",
      product: "",
      quantity: "",

      columnDefs: [
        { headerName: "OrderId", field: "id" },
        { headerName: "CustomerName", field: "customer_name", editable: true },
        {
          headerName: "CustomerEmail",
          field: "customer_email",
          editable: true,
        },
        { headerName: "Product", field: "product", editable: true },
        {
          headerName: "Quantity",
          field: "quantity",
          editable: true,
        },
      ],
      rowData: null,
    };
  }

  componentDidMount = () => {
    this.setState({ rowData: data });
  };

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  handleOnSubmit = () => {
    const {
      orderId,
      customerName,
      customerEmail,
      product,
      quantity,
    } = this.state;

    this.setState({
      rowData: [
        {
          id: orderId,
          customer_name: customerName,
          customer_email: customerEmail,
          product: product,
          quantity: quantity,
        },
        ...this.state.rowData,
      ],
    });

    this.setState({
      orderId: "",
      customerName: "",
      customerEmail: "",
      product: "",
      quantity: "",
    });

    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  deleteRow = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length === 0) {
      alert("Please select a row, Click on the row to select!!");
    } else {
      let del = this.state.rowData.filter((item) => {
        return !(
          selectedRows[0].id === item.id &&
          selectedRows[0].customer_email === item.customer_email
        );
      });

      this.setState({ rowData: del });
    }
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "500px", width: "100%" }}
      >
        <div className="d-flex flex-row ml-2">
          <button onClick={this.handleOpenModal}>Add Row</button>
          <div>
            <ReactModal
              ariaHideApp={false}
              isOpen={this.state.showModal}
              contentLabel="Minimal Modal Example"
            >
              <FormGroup>
                <Label for="orderId">orderId</Label>
                <Input
                  id="orderId"
                  placeholder="Enter Id"
                  value={this.state.orderId}
                  onChange={(e) => {
                    this.setState({ orderId: e.target.value });
                  }}
                />
                <Label for="customerName">customer Name</Label>
                <Input
                  id="customerName"
                  placeholder="Enter your customer_name"
                  value={this.state.customerName}
                  onChange={(e) => {
                    this.setState({ customerName: e.target.value });
                  }}
                />
                <Label for="customerEmail">Customer Email</Label>
                <Input
                  id="customerEmail"
                  placeholder="Enter your customerEmail"
                  value={this.state.customerEmail}
                  onChange={(e) => {
                    this.setState({ customerEmail: e.target.value });
                  }}
                />
                <Label for="product">product</Label>
                <Input
                  id="product"
                  placeholder="Enter your product"
                  value={this.state.product}
                  onChange={(e) => {
                    this.setState({ product: e.target.value });
                  }}
                />
                <Label for="quantity">quantity</Label>
                <Input
                  id="quantity"
                  placeholder="Enter your quantity"
                  value={this.state.quantity}
                  onChange={(e) => {
                    this.setState({ quantity: e.target.value });
                  }}
                />
              </FormGroup>

              <button onClick={this.handleOnSubmit}>Save</button>
              <button onClick={this.handleCloseModal}>Close</button>
            </ReactModal>
          </div>
          <button onClick={this.deleteRow}>Delete Row</button>
        </div>
        <AgGridReact
          onGridReady={this.onGridReady}
          rowSelection="single"
          onSelectionChanged={this.onSelectionChanged}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        ></AgGridReact>
      </div>
    );
  }
}
