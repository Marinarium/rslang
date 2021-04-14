export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// export function validateName(name) {
//     const re = /^[A-Za-zА-Яа-я -]+$/;
//     return re.test(String(name).toLowerCase())
//
// }


export const validateControl = (value, validation) => {
    if (!validation) {
        return true
    }
    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
        isValid = validateEmail(value) && isValid
    }

    if (validation.name) {
        isValid = (String(value).length >= 1) && isValid
    }

    if (validation.password) {
        isValid = (String(value).length > 7) && isValid
    }

    return isValid
};