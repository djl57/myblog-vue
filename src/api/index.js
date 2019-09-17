import * as axios from "./request";

export const AddTag = data => axios.postData("addTag", data);
export const GetTags = data => axios.getData("getTags", data);
export const DelTag = data => axios.deleteData("delTag", data);
export const PutTag = data => axios.putData("putTag", data);

export const AddCatagory = data => axios.postData("addCatagory", data);
export const GetCatagorys = data => axios.getData("getCatagorys", data);
export const DelCatagory = data => axios.deleteData("delCatagory", data);
export const PutCatagory = data => axios.putData("putCatagory", data);
