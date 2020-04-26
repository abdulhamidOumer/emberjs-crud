import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class InputForm extends Component {
  @tracked disabled = false;

  @action
  async addEmployee(getEmployees, toogleModal, currentEmployee, e) {
    this.disabled = true;
    const userId = currentEmployee.id;

    const first_name = e.target.elements.first_name.value;
    const last_name = e.target.elements.last_name.value;
    const email = e.target.elements.email.value;

    //Reqres API mimicker
    const url = `https://reqres.in/api/users/${userId || ""}`;
    const data = { first_name, last_name, email };
    const operation = userId ? "UPDATE" : "ADD";

    try {
      const response = await fetch(url, {
        method: userId ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newEmployee = await response.json();
      newEmployee.id = parseInt(newEmployee.id || userId);
      newEmployee.avatar = currentEmployee.avatar;

      this.disabled = false;
      //getEmployees();
      toogleModal(operation, newEmployee);
      e.target.reset();
    } catch (error) {
      console.log(error);
      alert("An error occured while saving data");
      this.disabled = false;
    }
  }
}
