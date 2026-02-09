import "../node_modules/modern-normalize/modern-normalize.css";
import "modern-normalize";
import "./styles/main.css";

import domController from "./ui/domController.js";

console.log("heheh HI!");

domController.loadMainContent();
domController.bindEvents();
