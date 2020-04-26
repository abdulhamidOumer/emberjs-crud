import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class EmployeeList extends Component {
  @tracked data = [];
  @tracked className = "modal";
  @tracked currentEmployee = {};
  @tracked gettingEmployees = false;

  defaultAvatar = "https://ui-avatars.com/api/?background=5cb85c&color=fff";

  handleOperation(operation, employee) {
    switch (operation) {
      case "ADD":
        this.data.unshift(employee);
        this.data = this.data;
        break;
      case "UPDATE":
        const index = this.data.findIndex((item) => item.id === employee.id);
        if (index >= 0) {
          this.data[index] = employee;
          this.data = this.data;
        }
        break;
      case "REMOVE":
        const newArray = this.data.filter((item) => item.id !== employee.id);
        this.data = newArray;
        break;
    }
  }

  @action
  toogleModal(operation, employee) {
    if (this.className === "modal") {
      this.className = "modal open";
    } else {
      if (operation && employee) {
        this.handleOperation(operation, employee);
      }
      this.className = "modal";
      this.currentEmployee = {};
    }
  }

  @action
  closeModal(e) {
    if (e.target.id === "modalContainer" && close) {
      this.className = "modal";
      this.currentEmployee = {};
    }
  }

  @action
  openEdit(employee) {
    this.currentEmployee = Object.assign({}, employee);
    this.toogleModal();
  }

  @action
  async deleteEmployee(employee) {
    const deletes = confirm(
      `Are you sure you want to delete ${employee.first_name} ?`
    );

    if (deletes) {
      this.gettingEmployees = true;
      try {
        const url = `https://reqres.in/api/users/${employee.id}`;
        await fetch(url, { method: "DELETE" });
        this.handleOperation("REMOVE", employee);
        this.gettingEmployees = false;
      } catch (error) {
        alert("Something went wrong");
        this.gettingEmployees = falss;
      }
    }
  }

  @action
  async getEmployees() {
    const url = `https://reqres.in/api/users?page=1&per_page=15`;
    this.gettingEmployees = true;
    try {
      const response = await fetch(url);
      const result = await response.json();
      this.data = result.data;
      this.gettingEmployees = false;
    } catch (error) {
      console.error(error);
      this.gettingEmployees = false;
    }
  }
}
