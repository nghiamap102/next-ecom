import Icon from "@assets/icon";
import { Box, Text } from "@chakra-ui/react";
import { isNonEmptyArray } from "@utils/validations";
import React from "react";

type SubMenuProps = {
    text?: string
    icon?: any
    childItem?: any[]
    handleMouseEnter?: any
    onClick?: () => void
};

const SubMenu: React.FC<SubMenuProps> = ({
    text,
    icon,
    handleMouseEnter,
    childItem,
    onClick,
}) => {

    return (
        <Box
            className="submenu cursor-pointer px-8 py-1.5 flex items-center justify-between"
            onMouseEnter={handleMouseEnter}
            onClick={() => isNonEmptyArray(childItem) && onClick}
        >
            <Box display={'flex'}>
                {icon}
                <Text marginLeft={5}>{text}</Text>
            </Box>
            
            <Icon.IconMd.MdKeyboardArrowRight />
            {/* {childItem?.map((ele) => (
                
            ))} */}
        </Box>
    );
};

export default SubMenu