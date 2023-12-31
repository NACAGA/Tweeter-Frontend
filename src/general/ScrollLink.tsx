import React from "react";
import { Button } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";

const ScrollLinkBase = React.forwardRef((props: any, ref) => {
    const { className, ...newProps } = props;
    return (
        <ScrollLink
            className={"NoDecoration NoSelect PointerCursor " + className}
            spy
            smooth
            offset={-70}
            duration={500}
            {...newProps}
        />
    );
});

const ScrollLinkButton = (props: any) => <Button component={ScrollLinkBase} {...props} />;

export { ScrollLinkBase };
export default ScrollLinkButton;
