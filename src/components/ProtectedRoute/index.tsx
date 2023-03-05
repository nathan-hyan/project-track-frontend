import { ReactNode } from 'react';
import { UserAuthLevel } from 'constants/users';

interface Props {
    children: ReactNode;
    requiredLevel: UserAuthLevel;
    isLoggedIn: boolean;
}

function ProtectedRoute({ children, isLoggedIn, requiredLevel }: Props) {
  return (
    <div>{children}</div>
  );
}
export default ProtectedRoute;
