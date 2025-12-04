import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { Section } from "./components/Section";
import { Content } from "./components/Content";
import { useIsMobile } from "./hooks/useIsMobile";
import "./App.css";

export default function App() {
  const isMobile = useIsMobile();

  const handleOrderClick = () => {
    alert("Thank you for your order!");
  };

  return (
    <>
      {/* 3D Canvas */}
      <Canvas
        shadows
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Scene isMobile={isMobile} />
      </Canvas>

      {/* Main Content Sections */}
      <div id="wrap">
        <Section bgColor="rgba(30, 60, 114, 0.15)">
          <div className="content main_content">
            <h1 className="title">Yoonji's Pretzel</h1>
            <p className="description">A sweet moment melting in your mouth</p>
          </div>
        </Section>

        <Section bgColor="rgba(139, 69, 19, 0.15)">
          <Content
            title="Soft Sweetness"
            description="Experience a burst of rich flavor with every bite"
          />
        </Section>

        <Section bgColor="rgba(160, 82, 45, 0.15)">
          <Content
            title="Variety of Flavors"
            description="From classic to seasonal specials, a pretzel for every taste"
          />
        </Section>

        <Section bgColor="rgba(165, 42, 42, 0.2)">
          <Content
            title="Order Now"
            description="Taste the warm and fresh Yoonji's Pretzels today"
            buttonText="Place Order"
            onButtonClick={handleOrderClick}
          />
        </Section>
      </div>
    </>
  );
}
