import { render, screen } from "@testing-library/react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

// describe("ProfileStatus component", () => {
//   test("status from props should be in the state", () => {
//     render(<ProfileStatusWithHooks status="Hello, world!" />);
//     expect(screen.getByText("Hello, world!")).toBeInTheDocument();
//   });
//
//   test("input should be displayed in editMode insted of span", async () => {
//     const { container } = render(
//       <ProfileStatusWithHooks status="Hello, world!" />,
//     );
//     const span = container.querySelector("span");
//     expect(span).toBeInTheDocument();
//     expect(span).toHaveTextContent("Hello, world!");
//   });
// });
