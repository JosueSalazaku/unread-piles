import BookComponent from "../apiFetch/fetchbooks";

const Home: React.FC = () => {
    console.log('Hello World');

  return (
    <div>
      <div>Hello World</div>
      <BookComponent />
    </div>
  )
}

export default Home;
