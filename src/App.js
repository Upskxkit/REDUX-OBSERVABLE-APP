import Icon from "antd/lib/icon";
import List from "antd/lib/list";
import "./App.css";
import Toolbar from "./components/toolbar";
import Module1 from "./containers/module1/";

const data = ["Scalable", "Reusable", "Maintainable", "Multiple dispatch"];

function App() {
  const text =
    "Using redux, redux-observables, rxjs, react-actions, middleware, ant-design";
  const title = "Advanced Redux Pattern";
  return (
    <div className="App">
      <Toolbar text={text} title={title} />
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Icon className="icon" type="check-circle" theme="outlined" />
            {item}
          </List.Item>
        )}
      />
      <div className="button-list">
        <Module1 />
      </div>
    </div>
  );
}

export default App;
