import Button from "antd/lib/button";
import Icon from "antd/lib/icon";
import List from "antd/lib/list";
import Spin from "antd/lib/spin";
import React from "react";
// import message from "antd/lib/message";
import { defaultProps, propTypes } from "./helpers";
// import { useDispatch } from "react-redux";

function View({ moduleList, isLoading, reduxAction }) {
  const { clearData, getModule1Epic, getModule1Cancel } = reduxAction;

  return (
    <main className="sample-module-section">
      <h4>Sample Module</h4>
      <Button className="btn" onClick={() => clearData()}>
        <Icon type="close-circle" />
        Clear Data
      </Button>
      <Button className="btn" onClick={() => getModule1Epic()}>
        Get
      </Button>
      <Button className="btn" onClick={() => getModule1Cancel()}>
        Cancel Now
      </Button>
      {isLoading ? (
        <div className="spin-container">
          <Spin />
        </div>
      ) : (
        <List
          className="data-list"
          size="small"
          bordered
          dataSource={moduleList}
          renderItem={(item) => <List.Item>{item.title}</List.Item>}
        />
      )}
    </main>
  );
}

View.propTypes = propTypes;
View.defaultProps = defaultProps;

export default View;
