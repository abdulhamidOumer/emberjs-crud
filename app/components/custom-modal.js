import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class CustomModal extends Component {
  @tracked className = "modal";

  @action
  toogleModal() {
    if (this.className === "modal") {
      this.className = "modal open";
    } else {
      this.className = "modal";
    }
  }
}
