<template>
  <header>file</header>
  <article>
    <button @click="onUploadExcel">上传 excel</button>
  </article>
</template>
<script setup lang="ts">
import axios from "axios"

const baseURL = "http://localhost:3000"

const onUploadExcel = () => {
  try {
    const inputElement = createUploadEvent(".xls, .xlsx")
    inputElement.onchange = (e) => {
      const formData = getFormDataByEvent(e)
      postFormData(formData)
    }
    inputElement.click()
  } catch (e) {
    console.error(e)
  }
}

const createUploadEvent = (fileType: string) => {
  const inputElement = document.createElement("input")
  inputElement.type = "file"
  inputElement.accept = fileType
  return inputElement
}
const getFormDataByEvent = (e) => {
  const file = e.target!.files[0]
  const formData = new FormData()
  formData.append("file", file)

  return formData
}
const postFormData = (formData: FormData) => {
  return axios.post("/file/uploadExcel", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    baseURL,
  })
}
</script>
