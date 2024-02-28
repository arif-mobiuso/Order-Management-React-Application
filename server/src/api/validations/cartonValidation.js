import yup from "yup" ; 

const cartonSchema = yup.object({
    cartonId : yup.number().positive().integer().required(),
    length   : yup.number().positive().integer().required(),
    width    : yup.number().positive().integer().required(),
    height   : yup.number().positive().integer().required(),
}) ;

export default cartonSchema;