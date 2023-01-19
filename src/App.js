import Quiz from "./components/Questions/Quiz";


function App() {
  return (
    <div className="App p-5  sm:p-10 flex min-h-screen h-full ">
      <Quiz></Quiz>
      <div id="background-wrap">
        <div class="bubble x1"></div>
        <div class="bubble x2"></div>
        <div class="bubble x3"></div>
        <div class="bubble x4"></div>
        <div class="bubble x5"></div>
        <div class="bubble x6"></div>
        <div class="bubble x7"></div>
        <div class="bubble x8"></div>
        <div class="bubble x9"></div>
        <div class="bubble x10"></div>
      </div>
    </div>
  );
}

export default App;
