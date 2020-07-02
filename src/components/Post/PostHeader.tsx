import React, {FC} from 'react'
import {ReactComponent as DeleteIcon} from "../../icons/cross.svg";
import styled from "styled-components";

type Props = {
    avatar: string | undefined
    name: string
    date: string
    onDelete: () => void
}

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
`;
const NameAndPhoto = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DateAndSettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const DeleteButton = styled(DeleteIcon)`
  align-self: flex-end;
  &:hover {
    cursor: pointer;
  }
`;
const Photo = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 7px;
`;
const Name = styled.p`
    font-size: 15px;
    font-weight: 600;
`;
const Info = styled.p`
    font-size: 12px;
    font-weight: 500;
    color: #B1B6B8;
`;

const PostHeader: FC<Props> = ({avatar, name, date,onDelete}) => {
    return (
        <Header>
            <NameAndPhoto>
                <Photo src={avatar} alt="Avatar"/>
                <div>
                    <Name>{name}</Name>
                    <Info>Front-end developer</Info>
                </div>
            </NameAndPhoto>

            <DateAndSettings>
                <DeleteButton onClick={onDelete}> {/*div*/}
                    <DeleteIcon/> {/*svg icon*/}
                </DeleteButton>
                <Info>{date}</Info>
            </DateAndSettings>
        </Header>
    )
}

export default PostHeader