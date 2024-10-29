import Button from "../../components/Button";
import Input from "../../components/Input";

function Main() {
  return (
    <>
      <div className="font-h1">오이지라능</div>
      <div className="primary">오이지라능</div>
      <h1>수미님 바보</h1>
      <Button type="submit">클릭</Button>
      <br />
      <Input type={"email"} placeholder="email" />
    </>
  );
}

export default Main;
