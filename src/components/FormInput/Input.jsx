import React from "react";
import clsx from "clsx";
import "./Input.scss";

const Input = React.forwardRef(({
    children,
    isFullWidth,
    required,
    isError,
    isDisabled,
    type,
    prefix,
    ...rest
}, ref) => {

    //prevent scrolling on input type="number"
    document.addEventListener("wheel", () => {
        if (document.activeElement.type === "number") {
            document.activeElement.blur();
        }
    });

    return (
        <div className="form-item__input-wrapper">
            <div className={clsx("d-flex", (prefix && prefix.length > 10) && "mobile-span")}>
                {prefix &&
                    <span className={clsx("prefix-bg", prefix.length > 10 && "prefix-bg-mobile")}>
                        {prefix}
                    </span>
                }
                <input
                    {...rest}
                    ref={ref}
                    className={clsx(
                        "input",
                        isFullWidth && "input--full-width",
                        isError && "input--error",
                    )}
                    required={required}
                    type={type}
                    disabled={isDisabled}
                >
                    {children}
                </input>
            </div>
        </div>
    );
}
);

Input.defaultProps = {
    children: null,
    className: undefined,
    isFullWidth: false,
    isError: false,
    isDisabled: false,
    required: false,
    type: "text",
};

export default Input;
