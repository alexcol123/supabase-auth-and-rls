// Pixel size for the 8-bit art
const px = 5;

// Color palette
export const colors = {
  // Hopper (Hawkins Police Chief)
  hopperHair: "#3B2417",
  hopperSkin: "#E5C4A8",
  mustache: "#3B2417",
  hopperShirt: "#C9B896",
  hopperBadge: "#DAA520",
  hopperPants: "#3B3530",
  // Eleven (Season 1 - pink dress, blue jacket)
  elevenHair: "#3D2B1F",
  elevenSkin: "#F5E0D0",
  elevenDress: "#D4A59A",
  elevenCollar: "#F5F5F5",
  elevenJacket: "#4A6FA5",
  // Max (Season 4 look)
  maxHair: "#C2623D",
  maxSkin: "#F0D0B8",
  freckle: "#D4A574",
  maxHoodie: "#5DADE2",
  maxShirt: "#F4D03F",
  // Shared
  eye: "#1a1a1a",
  mouth: "#C97878",
};

// Pixel art styles using box-shadow
export const pixelArtStyles = {
  hopper: {
    width: px,
    height: px,
    backgroundColor: colors.hopperHair,
    boxShadow: `
      ${px}px 0 ${colors.hopperHair}, ${2*px}px 0 ${colors.hopperHair}, ${3*px}px 0 ${colors.hopperHair},
      ${4*px}px 0 ${colors.hopperHair}, ${5*px}px 0 ${colors.hopperHair}, ${6*px}px 0 ${colors.hopperHair},
      0 ${px}px ${colors.hopperHair}, ${px}px ${px}px ${colors.hopperHair}, ${2*px}px ${px}px ${colors.hopperHair},
      ${3*px}px ${px}px ${colors.hopperHair}, ${4*px}px ${px}px ${colors.hopperHair}, ${5*px}px ${px}px ${colors.hopperHair},
      ${6*px}px ${px}px ${colors.hopperHair}, ${7*px}px ${px}px ${colors.hopperHair},
      0 ${2*px}px ${colors.hopperHair}, ${px}px ${2*px}px ${colors.hopperSkin}, ${2*px}px ${2*px}px ${colors.hopperSkin},
      ${3*px}px ${2*px}px ${colors.hopperSkin}, ${4*px}px ${2*px}px ${colors.hopperSkin}, ${5*px}px ${2*px}px ${colors.hopperSkin},
      ${6*px}px ${2*px}px ${colors.hopperSkin}, ${7*px}px ${2*px}px ${colors.hopperHair},
      0 ${3*px}px ${colors.hopperSkin}, ${px}px ${3*px}px ${colors.hopperSkin}, ${2*px}px ${3*px}px ${colors.eye},
      ${3*px}px ${3*px}px ${colors.hopperSkin}, ${4*px}px ${3*px}px ${colors.hopperSkin}, ${5*px}px ${3*px}px ${colors.eye},
      ${6*px}px ${3*px}px ${colors.hopperSkin}, ${7*px}px ${3*px}px ${colors.hopperSkin},
      0 ${4*px}px ${colors.hopperSkin}, ${px}px ${4*px}px ${colors.hopperSkin}, ${2*px}px ${4*px}px ${colors.hopperSkin},
      ${3*px}px ${4*px}px ${colors.hopperSkin}, ${4*px}px ${4*px}px ${colors.hopperSkin}, ${5*px}px ${4*px}px ${colors.hopperSkin},
      ${6*px}px ${4*px}px ${colors.hopperSkin}, ${7*px}px ${4*px}px ${colors.hopperSkin},
      0 ${5*px}px ${colors.hopperSkin}, ${px}px ${5*px}px ${colors.mustache}, ${2*px}px ${5*px}px ${colors.mustache},
      ${3*px}px ${5*px}px ${colors.mustache}, ${4*px}px ${5*px}px ${colors.mustache}, ${5*px}px ${5*px}px ${colors.mustache},
      ${6*px}px ${5*px}px ${colors.mustache}, ${7*px}px ${5*px}px ${colors.hopperSkin},
      0 ${6*px}px ${colors.hopperSkin}, ${px}px ${6*px}px ${colors.hopperSkin}, ${2*px}px ${6*px}px ${colors.hopperSkin},
      ${3*px}px ${6*px}px ${colors.mouth}, ${4*px}px ${6*px}px ${colors.mouth}, ${5*px}px ${6*px}px ${colors.hopperSkin},
      ${6*px}px ${6*px}px ${colors.hopperSkin}, ${7*px}px ${6*px}px ${colors.hopperSkin},
      ${px}px ${7*px}px ${colors.hopperSkin}, ${2*px}px ${7*px}px ${colors.hopperSkin}, ${3*px}px ${7*px}px ${colors.hopperSkin},
      ${4*px}px ${7*px}px ${colors.hopperSkin}, ${5*px}px ${7*px}px ${colors.hopperSkin}, ${6*px}px ${7*px}px ${colors.hopperSkin},
      ${2*px}px ${8*px}px ${colors.hopperSkin}, ${3*px}px ${8*px}px ${colors.hopperSkin},
      ${4*px}px ${8*px}px ${colors.hopperSkin}, ${5*px}px ${8*px}px ${colors.hopperSkin},
      0 ${9*px}px ${colors.hopperShirt}, ${px}px ${9*px}px ${colors.hopperShirt}, ${2*px}px ${9*px}px ${colors.hopperShirt},
      ${3*px}px ${9*px}px ${colors.hopperShirt}, ${4*px}px ${9*px}px ${colors.hopperShirt}, ${5*px}px ${9*px}px ${colors.hopperShirt},
      ${6*px}px ${9*px}px ${colors.hopperShirt}, ${7*px}px ${9*px}px ${colors.hopperShirt},
      0 ${10*px}px ${colors.hopperShirt}, ${px}px ${10*px}px ${colors.hopperBadge}, ${2*px}px ${10*px}px ${colors.hopperShirt},
      ${3*px}px ${10*px}px ${colors.hopperShirt}, ${4*px}px ${10*px}px ${colors.hopperShirt}, ${5*px}px ${10*px}px ${colors.hopperShirt},
      ${6*px}px ${10*px}px ${colors.hopperShirt}, ${7*px}px ${10*px}px ${colors.hopperShirt},
      0 ${11*px}px ${colors.hopperShirt}, ${px}px ${11*px}px ${colors.hopperShirt}, ${2*px}px ${11*px}px ${colors.hopperShirt},
      ${3*px}px ${11*px}px ${colors.hopperShirt}, ${4*px}px ${11*px}px ${colors.hopperShirt}, ${5*px}px ${11*px}px ${colors.hopperShirt},
      ${6*px}px ${11*px}px ${colors.hopperShirt}, ${7*px}px ${11*px}px ${colors.hopperShirt},
      0 ${12*px}px ${colors.hopperPants}, ${px}px ${12*px}px ${colors.hopperPants}, ${2*px}px ${12*px}px ${colors.hopperPants},
      ${3*px}px ${12*px}px ${colors.hopperBadge}, ${4*px}px ${12*px}px ${colors.hopperBadge}, ${5*px}px ${12*px}px ${colors.hopperPants},
      ${6*px}px ${12*px}px ${colors.hopperPants}, ${7*px}px ${12*px}px ${colors.hopperPants},
      0 ${13*px}px ${colors.hopperPants}, ${px}px ${13*px}px ${colors.hopperPants}, ${2*px}px ${13*px}px ${colors.hopperPants},
      ${3*px}px ${13*px}px ${colors.hopperPants}, ${4*px}px ${13*px}px ${colors.hopperPants}, ${5*px}px ${13*px}px ${colors.hopperPants},
      ${6*px}px ${13*px}px ${colors.hopperPants}, ${7*px}px ${13*px}px ${colors.hopperPants},
      ${px}px ${14*px}px ${colors.hopperPants}, ${2*px}px ${14*px}px ${colors.hopperPants}, ${3*px}px ${14*px}px ${colors.hopperPants},
      ${4*px}px ${14*px}px ${colors.hopperPants}, ${5*px}px ${14*px}px ${colors.hopperPants}, ${6*px}px ${14*px}px ${colors.hopperPants},
      ${px}px ${15*px}px ${colors.hopperPants}, ${2*px}px ${15*px}px ${colors.hopperPants},
      ${5*px}px ${15*px}px ${colors.hopperPants}, ${6*px}px ${15*px}px ${colors.hopperPants}
    `,
  },
  eleven: {
    width: px,
    height: px,
    backgroundColor: colors.elevenHair,
    boxShadow: `
      ${px}px 0 ${colors.elevenHair}, ${2*px}px 0 ${colors.elevenHair}, ${3*px}px 0 ${colors.elevenHair},
      ${4*px}px 0 ${colors.elevenHair}, ${5*px}px 0 ${colors.elevenHair}, ${6*px}px 0 ${colors.elevenHair},
      0 ${px}px ${colors.elevenHair}, ${px}px ${px}px ${colors.elevenHair}, ${2*px}px ${px}px ${colors.elevenHair},
      ${3*px}px ${px}px ${colors.elevenHair}, ${4*px}px ${px}px ${colors.elevenHair}, ${5*px}px ${px}px ${colors.elevenHair},
      ${6*px}px ${px}px ${colors.elevenHair}, ${7*px}px ${px}px ${colors.elevenHair},
      0 ${2*px}px ${colors.elevenHair}, ${px}px ${2*px}px ${colors.elevenSkin}, ${2*px}px ${2*px}px ${colors.elevenSkin},
      ${3*px}px ${2*px}px ${colors.elevenSkin}, ${4*px}px ${2*px}px ${colors.elevenSkin}, ${5*px}px ${2*px}px ${colors.elevenSkin},
      ${6*px}px ${2*px}px ${colors.elevenSkin}, ${7*px}px ${2*px}px ${colors.elevenHair},
      0 ${3*px}px ${colors.elevenSkin}, ${px}px ${3*px}px ${colors.eye}, ${2*px}px ${3*px}px ${colors.eye},
      ${3*px}px ${3*px}px ${colors.elevenSkin}, ${4*px}px ${3*px}px ${colors.elevenSkin}, ${5*px}px ${3*px}px ${colors.eye},
      ${6*px}px ${3*px}px ${colors.eye}, ${7*px}px ${3*px}px ${colors.elevenSkin},
      0 ${4*px}px ${colors.elevenSkin}, ${px}px ${4*px}px ${colors.elevenSkin}, ${2*px}px ${4*px}px ${colors.elevenSkin},
      ${3*px}px ${4*px}px ${colors.elevenSkin}, ${4*px}px ${4*px}px ${colors.elevenSkin}, ${5*px}px ${4*px}px ${colors.elevenSkin},
      ${6*px}px ${4*px}px ${colors.elevenSkin}, ${7*px}px ${4*px}px ${colors.elevenSkin},
      0 ${5*px}px ${colors.elevenSkin}, ${px}px ${5*px}px ${colors.elevenSkin}, ${2*px}px ${5*px}px ${colors.elevenSkin},
      ${3*px}px ${5*px}px ${colors.elevenSkin}, ${4*px}px ${5*px}px ${colors.elevenSkin}, ${5*px}px ${5*px}px ${colors.elevenSkin},
      ${6*px}px ${5*px}px ${colors.elevenSkin}, ${7*px}px ${5*px}px ${colors.elevenSkin},
      0 ${6*px}px ${colors.elevenSkin}, ${px}px ${6*px}px ${colors.elevenSkin}, ${2*px}px ${6*px}px ${colors.elevenSkin},
      ${3*px}px ${6*px}px ${colors.mouth}, ${4*px}px ${6*px}px ${colors.mouth}, ${5*px}px ${6*px}px ${colors.elevenSkin},
      ${6*px}px ${6*px}px ${colors.elevenSkin}, ${7*px}px ${6*px}px ${colors.elevenSkin},
      ${px}px ${7*px}px ${colors.elevenSkin}, ${2*px}px ${7*px}px ${colors.elevenSkin}, ${3*px}px ${7*px}px ${colors.elevenSkin},
      ${4*px}px ${7*px}px ${colors.elevenSkin}, ${5*px}px ${7*px}px ${colors.elevenSkin}, ${6*px}px ${7*px}px ${colors.elevenSkin},
      ${2*px}px ${8*px}px ${colors.elevenCollar}, ${3*px}px ${8*px}px ${colors.elevenSkin},
      ${4*px}px ${8*px}px ${colors.elevenSkin}, ${5*px}px ${8*px}px ${colors.elevenCollar},
      0 ${9*px}px ${colors.elevenJacket}, ${px}px ${9*px}px ${colors.elevenJacket}, ${2*px}px ${9*px}px ${colors.elevenDress},
      ${3*px}px ${9*px}px ${colors.elevenDress}, ${4*px}px ${9*px}px ${colors.elevenDress}, ${5*px}px ${9*px}px ${colors.elevenDress},
      ${6*px}px ${9*px}px ${colors.elevenJacket}, ${7*px}px ${9*px}px ${colors.elevenJacket},
      0 ${10*px}px ${colors.elevenJacket}, ${px}px ${10*px}px ${colors.elevenJacket}, ${2*px}px ${10*px}px ${colors.elevenDress},
      ${3*px}px ${10*px}px ${colors.elevenDress}, ${4*px}px ${10*px}px ${colors.elevenDress}, ${5*px}px ${10*px}px ${colors.elevenDress},
      ${6*px}px ${10*px}px ${colors.elevenJacket}, ${7*px}px ${10*px}px ${colors.elevenJacket},
      0 ${11*px}px ${colors.elevenJacket}, ${px}px ${11*px}px ${colors.elevenJacket}, ${2*px}px ${11*px}px ${colors.elevenDress},
      ${3*px}px ${11*px}px ${colors.elevenDress}, ${4*px}px ${11*px}px ${colors.elevenDress}, ${5*px}px ${11*px}px ${colors.elevenDress},
      ${6*px}px ${11*px}px ${colors.elevenJacket}, ${7*px}px ${11*px}px ${colors.elevenJacket},
      0 ${12*px}px ${colors.elevenJacket}, ${px}px ${12*px}px ${colors.elevenDress}, ${2*px}px ${12*px}px ${colors.elevenDress},
      ${3*px}px ${12*px}px ${colors.elevenDress}, ${4*px}px ${12*px}px ${colors.elevenDress}, ${5*px}px ${12*px}px ${colors.elevenDress},
      ${6*px}px ${12*px}px ${colors.elevenDress}, ${7*px}px ${12*px}px ${colors.elevenJacket},
      ${px}px ${13*px}px ${colors.elevenDress}, ${2*px}px ${13*px}px ${colors.elevenDress},
      ${3*px}px ${13*px}px ${colors.elevenDress}, ${4*px}px ${13*px}px ${colors.elevenDress},
      ${5*px}px ${13*px}px ${colors.elevenDress}, ${6*px}px ${13*px}px ${colors.elevenDress},
      ${2*px}px ${14*px}px ${colors.elevenSkin}, ${3*px}px ${14*px}px ${colors.elevenSkin},
      ${4*px}px ${14*px}px ${colors.elevenSkin}, ${5*px}px ${14*px}px ${colors.elevenSkin},
      ${px}px ${15*px}px ${colors.elevenHair}, ${2*px}px ${15*px}px ${colors.elevenHair},
      ${5*px}px ${15*px}px ${colors.elevenHair}, ${6*px}px ${15*px}px ${colors.elevenHair}
    `,
  },
  max: {
    width: px,
    height: px,
    backgroundColor: colors.maxHair,
    boxShadow: `
      ${px}px 0 ${colors.maxHair}, ${6*px}px 0 ${colors.maxHair}, ${7*px}px 0 ${colors.maxHair},
      0 ${px}px ${colors.maxHair}, ${px}px ${px}px ${colors.maxHair}, ${2*px}px ${px}px ${colors.maxHair},
      ${3*px}px ${px}px ${colors.maxHair}, ${4*px}px ${px}px ${colors.maxHair}, ${5*px}px ${px}px ${colors.maxHair},
      ${6*px}px ${px}px ${colors.maxHair}, ${7*px}px ${px}px ${colors.maxHair},
      0 ${2*px}px ${colors.maxHair}, ${px}px ${2*px}px ${colors.maxSkin}, ${2*px}px ${2*px}px ${colors.maxSkin},
      ${3*px}px ${2*px}px ${colors.maxSkin}, ${4*px}px ${2*px}px ${colors.maxSkin}, ${5*px}px ${2*px}px ${colors.maxSkin},
      ${6*px}px ${2*px}px ${colors.maxSkin}, ${7*px}px ${2*px}px ${colors.maxHair},
      0 ${3*px}px ${colors.maxHair}, ${px}px ${3*px}px ${colors.maxSkin}, ${2*px}px ${3*px}px ${colors.eye},
      ${3*px}px ${3*px}px ${colors.maxSkin}, ${4*px}px ${3*px}px ${colors.maxSkin}, ${5*px}px ${3*px}px ${colors.eye},
      ${6*px}px ${3*px}px ${colors.maxSkin}, ${7*px}px ${3*px}px ${colors.maxHair},
      0 ${4*px}px ${colors.maxHair}, ${px}px ${4*px}px ${colors.freckle}, ${2*px}px ${4*px}px ${colors.maxSkin},
      ${3*px}px ${4*px}px ${colors.maxSkin}, ${4*px}px ${4*px}px ${colors.maxSkin}, ${5*px}px ${4*px}px ${colors.maxSkin},
      ${6*px}px ${4*px}px ${colors.freckle}, ${7*px}px ${4*px}px ${colors.maxHair},
      0 ${5*px}px ${colors.maxHair}, ${px}px ${5*px}px ${colors.maxSkin}, ${2*px}px ${5*px}px ${colors.maxSkin},
      ${3*px}px ${5*px}px ${colors.maxSkin}, ${4*px}px ${5*px}px ${colors.maxSkin}, ${5*px}px ${5*px}px ${colors.maxSkin},
      ${6*px}px ${5*px}px ${colors.maxSkin}, ${7*px}px ${5*px}px ${colors.maxHair},
      0 ${6*px}px ${colors.maxHair}, ${px}px ${6*px}px ${colors.maxSkin}, ${2*px}px ${6*px}px ${colors.maxSkin},
      ${3*px}px ${6*px}px ${colors.mouth}, ${4*px}px ${6*px}px ${colors.mouth}, ${5*px}px ${6*px}px ${colors.maxSkin},
      ${6*px}px ${6*px}px ${colors.maxSkin}, ${7*px}px ${6*px}px ${colors.maxHair},
      0 ${7*px}px ${colors.maxHair}, ${px}px ${7*px}px ${colors.maxSkin}, ${2*px}px ${7*px}px ${colors.maxSkin},
      ${3*px}px ${7*px}px ${colors.maxSkin}, ${4*px}px ${7*px}px ${colors.maxSkin}, ${5*px}px ${7*px}px ${colors.maxSkin},
      ${6*px}px ${7*px}px ${colors.maxSkin}, ${7*px}px ${7*px}px ${colors.maxHair},
      0 ${8*px}px ${colors.maxHair}, ${2*px}px ${8*px}px ${colors.maxSkin}, ${3*px}px ${8*px}px ${colors.maxSkin},
      ${4*px}px ${8*px}px ${colors.maxSkin}, ${5*px}px ${8*px}px ${colors.maxSkin}, ${7*px}px ${8*px}px ${colors.maxHair},
      0 ${9*px}px ${colors.maxHair}, ${px}px ${9*px}px ${colors.maxHoodie}, ${2*px}px ${9*px}px ${colors.maxHoodie},
      ${3*px}px ${9*px}px ${colors.maxShirt}, ${4*px}px ${9*px}px ${colors.maxShirt}, ${5*px}px ${9*px}px ${colors.maxHoodie},
      ${6*px}px ${9*px}px ${colors.maxHoodie}, ${7*px}px ${9*px}px ${colors.maxHair},
      0 ${10*px}px ${colors.maxHoodie}, ${px}px ${10*px}px ${colors.maxHoodie}, ${2*px}px ${10*px}px ${colors.maxHoodie},
      ${3*px}px ${10*px}px ${colors.maxHoodie}, ${4*px}px ${10*px}px ${colors.maxHoodie}, ${5*px}px ${10*px}px ${colors.maxHoodie},
      ${6*px}px ${10*px}px ${colors.maxHoodie}, ${7*px}px ${10*px}px ${colors.maxHoodie},
      0 ${11*px}px ${colors.maxSkin}, ${px}px ${11*px}px ${colors.maxHoodie}, ${2*px}px ${11*px}px ${colors.maxHoodie},
      ${3*px}px ${11*px}px ${colors.maxHoodie}, ${4*px}px ${11*px}px ${colors.maxHoodie}, ${5*px}px ${11*px}px ${colors.maxHoodie},
      ${6*px}px ${11*px}px ${colors.maxHoodie}, ${7*px}px ${11*px}px ${colors.maxSkin},
      ${px}px ${12*px}px #3B2417, ${2*px}px ${12*px}px #3B2417,
      ${3*px}px ${12*px}px #3B2417, ${4*px}px ${12*px}px #3B2417,
      ${5*px}px ${12*px}px #3B2417, ${6*px}px ${12*px}px #3B2417,
      ${px}px ${13*px}px #3B2417, ${2*px}px ${13*px}px #3B2417,
      ${3*px}px ${13*px}px #3B2417, ${4*px}px ${13*px}px #3B2417,
      ${5*px}px ${13*px}px #3B2417, ${6*px}px ${13*px}px #3B2417,
      ${px}px ${14*px}px #3B2417, ${2*px}px ${14*px}px #3B2417,
      ${5*px}px ${14*px}px #3B2417, ${6*px}px ${14*px}px #3B2417,
      ${px}px ${15*px}px ${colors.maxHair}, ${2*px}px ${15*px}px ${colors.maxShirt},
      ${5*px}px ${15*px}px ${colors.maxShirt}, ${6*px}px ${15*px}px ${colors.maxHair}
    `,
  },
};

// Reusable character component
type CharacterName = "hopper" | "eleven" | "max";

interface PixelCharacterProps {
  character: CharacterName;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  hoverable?: boolean;
}

const sizeMap = {
  sm: { width: 24, height: 48, scale: 0.6 },
  md: { width: 40, height: 80, scale: 1 },
  lg: { width: 56, height: 112, scale: 1.4 },
};

const characterInfo = {
  hopper: { name: "Hopper", role: "Admin", color: "text-red-500" },
  eleven: { name: "Eleven", role: "User", color: "text-blue-400" },
  max: { name: "Max", role: "User", color: "text-orange-400" },
};

export const PixelCharacter = ({
  character,
  size = "md",
  showName = true,
  hoverable = true,
}: PixelCharacterProps) => {
  const { width, height } = sizeMap[size];
  const info = characterInfo[character];

  return (
    <div className={`flex flex-col items-center ${hoverable ? "group cursor-pointer" : ""}`}>
      <div
        className={`mb-3 relative ${hoverable ? "transition-transform duration-200 group-hover:-translate-y-2 group-hover:scale-110" : ""}`}
        style={{ width, height }}
      >
        <div style={pixelArtStyles[character]} />
      </div>
      {showName && (
        <>
          <p className={`font-semibold text-sm ${info.color} ${hoverable ? "transition-colors" : ""}`}>
            {info.name}
          </p>
          <p className="text-xs text-gray-600">{info.role}</p>
        </>
      )}
    </div>
  );
};

// Export all three characters as a group
export const PixelCharacterGroup = () => (
  <div className="flex justify-center gap-12">
    <PixelCharacter character="hopper" />
    <PixelCharacter character="eleven" />
    <PixelCharacter character="max" />
  </div>
);

export default PixelCharacter;
