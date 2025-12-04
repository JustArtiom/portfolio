import WithBackground from "./components/WithBackground";
import NeuralNetworkBackground from "./components/NeuralNetworkBackground";

export default function App() {
  return (
    <WithBackground
      className="min-h-screen w-full overflow-hidden"
      element={<NeuralNetworkBackground />}
    >
      <div className="w-full h-screen flex items-center justify-center">
        Hello world
      </div>
    </WithBackground>
  );
}
