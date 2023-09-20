import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import "./utils/error/customError"

createApp(App).mount("#app")

try {
  throw new CustomError<number, { name: string }>("error message", 300, {
    name: "CustomError",
  })
} catch (e) {
  if (e instanceof CustomError) {
    console.log(e.single, e.message, e.data)
  } else {
    console.log(e)
  }
}

try {
  throw new Error("error message")
} catch (e) {
  if (e instanceof CustomError) {
    console.log(e.single, e.message, e.data)
  } else {
    console.log(e)
  }
}
