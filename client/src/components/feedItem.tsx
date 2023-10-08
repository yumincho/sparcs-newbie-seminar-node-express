import React from "react";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import "./css/feedItem.css";

interface Props {
  id: number;
  title: string;
  content: string;
  reloadFeed: () => () => void;
}

const FeedItem = ({ id, title, content, reloadFeed }: Props) => {
  const [PostEdit, setPostEdit] = React.useState<boolean>(false);
  const [NewTitle, setNewTitle] = React.useState<string>(title);
  const [NewContent, setNewContent] = React.useState<string>(content);

  const showEditModal = () => {
    setPostEdit((curr) => !curr);
  };

  const editPost = (id: number, newTitle: string, newContent: string) => {
    const asyncFun = async () => {
      await axios.post(SAPIBase + "/feed/editFeed", {
        id: id,
        title: newTitle,
        content: newContent,
      });
      reloadFeed();
    };
    asyncFun().catch((e) => window.alert(`An ERROR OCCURED! ${e}`));
    showEditModal();
  };

  return PostEdit ? (
    <div className={"feed-item-edit"}>
      Title:{" "}
      <input
        type={"text"}
        value={NewTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      &nbsp;&nbsp;&nbsp;&nbsp; Content:{" "}
      <input
        type={"text"}
        value={NewContent}
        onChange={(e) => setNewContent(e.target.value)}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => editPost(id, NewTitle, NewContent)}>done</button>
    </div>
  ) : (
    <>
      <div className={"edit-item"} onClick={() => showEditModal()}>
        ✎
      </div>
      <h3 className={"feed-title"}>{title}</h3>
      <p className={"feed-body"}>{content}</p>
    </>
  );
};

export default FeedItem;
