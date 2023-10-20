import React, { useMemo } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

import "./FormInput.scss";
import Input from "./Input";

const FormInput = ({
    id,
    name,
    label,
    type,
    className,
    isDisabled,
    required,
    asterisk = required,
    maxLength,
    minLength,
    max,
    min,
    pattern,
    onItemChange,
    helperText,
    showErrors,
    labelDescription,
    ...rest
}) => {

    const {
        register,
        formState: { errors },
    } = useFormContext();

    const error = errors[name]
    const isError = Boolean(error);

    let bottomLabel = helperText;
    if (isError && showErrors) {
        bottomLabel = error?.message || "Invalid";
    }

    const registerOptions = useMemo(
        () => ({
            required: validation(required, "required"),
            maxLength: validation(maxLength, "maxLength"),
            minLength: validation(minLength, "minLength"),
            max: validation(max, "max"),
            min: validation(min, "min"),
            pattern: validation(pattern, "pattern"),
        }),
        [required, maxLength, minLength, max, min, pattern]
    );

    function validation(obj, name) {
        if (obj === undefined || obj === null) {
          return undefined;
        }
        let value = obj;
        if (typeof obj === "object" && "value" in obj) {
          // Already has a value and a message - nothing to do
          if (obj.message) {
            return obj;
          }
          ({ value } = obj);
        } else if (typeof obj === "string" && name === "required") {
          return { value: true, message: obj };
        }
        // Get the default message, inserting the value as a parameter
        const message = ` Required`;
        return {
          value,
          message,
        };
      }

    return (
        <div
            className={clsx(
                "form-item",
                `form-item--${type}`,
                isDisabled && "form-item--disabled",
                className
            )}
        >
            <label htmlFor={id} className="form-item__label">
                {label}
                {!required && <span style={{ color: "#cccccc" }}> {"(optional)"}</span>}
            </label>

            <Input
                {...rest}
                {...register(name, registerOptions)}
                isError={isError}
                isDisabled={isDisabled}
                className={"form-item__input"}
                type={type}
                id={id}
            />

            {bottomLabel ? (
                <div
                    className={clsx(
                        "form-item__bottom-label",
                        isError && "form-item__bottom-label--error"
                    )}
                >
                    {bottomLabel}
                </div>
            ) : null}

        </div>
    );
};

FormInput.defaultProps = {
    type: "text",
    label: null,
    className: undefined,
    isDisabled: false,
    required: false,
    onItemChange: undefined,
    helperText: null,
    showErrors: true,
};

export default FormInput;
