export const validate = (values = {}, rules = {}) => {
    const errors = [];

    const emailPattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    for (const value in values) {
        if (rules[value]?.req === true && !values[value]) {
            errors.push(`${value} field is required`);
        } else if (
            rules[value].min &&
            values[value].length < rules[value]?.min
        ) {
            errors.push(
                `${value} field must contain at least ${rules[value].min} characters`
            );
        } else if (
            rules[value].max &&
            values[value].length > rules[value]?.max
        ) {
            errors.push(
                `${value} field must have max ${rules[value].max} characters`
            );
        } else if (
            rules[value].type &&
            rules[value].type === 'EMAIL' &&
            !emailPattern.test(String(values[value]).toLowerCase())
        ) {
            errors.push(`${value} field must be an email`);
        }
    }

    return errors;
};
