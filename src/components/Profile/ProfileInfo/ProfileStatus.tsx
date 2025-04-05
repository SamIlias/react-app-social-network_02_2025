// import s from "../Profile.module.css";
// import React, { ChangeEvent } from "react";
//
// type StateType = {
//   editMode: boolean;
//   status: string;
// };
//
// type PropsType = {
//   status: string | "";
//   updateUserStatus: (status: string, token: string | null) => void;
// };
//
// class ProfileStatus extends React.Component<PropsType, StateType> {
//   state: StateType = {
//     editMode: false,
//     status: this.props.status,
//   };
//
//   activateEditMode = () => {
//     this.setState({
//       editMode: true,
//     });
//   };
//
//   deactivateEditMode = (token: string | null) => {
//     this.setState({
//       editMode: false,
//     });
//     this.props.updateUserStatus(this.state.status, token);
//   };
//
//   onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       status: e.currentTarget.value,
//     });
//   };
//
//   componentDidUpdate(prevProps: PropsType, prevState: StateType) {
//     if (prevProps.status !== this.props.status) {
//       this.setState({
//         status: this.props.status,
//       });
//     }
//   }
//
//   render() {
//     return (
//       <div className={s.profileStatus}>
//         {this.state.editMode ? (
//           <div>
//             <input
//               onChange={this.onStatusChange}
//               autoFocus={true}
//               onBlur={() => this.deactivateEditMode}
//               value={this.state.status}
//             />
//           </div>
//         ) : (
//           <div>
//             <span onDoubleClick={this.activateEditMode}>
//               {this.state.status}
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
//
// export default ProfileStatus;
