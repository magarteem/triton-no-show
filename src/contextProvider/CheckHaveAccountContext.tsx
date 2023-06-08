import { createContext, ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../core/redux/app/hooks";
import { FilterModalLayout } from "../common/layout/filterModalLayout/FilterModalLayout";
import { sxStyle } from "../pages/styles/sx";
import { ModalNotFoundAccount } from "../common/components/profile/aboutProfile/modalNotFoundAccount/ModalNotFoundAccount";

interface Props {
  children: ReactNode;
}

export const CheckMyHaveAccountContext = createContext({});

export const CheckHaveAccountContext = ({ children, ...props }: Props) => {
  const notHaveForms = useAppSelector((state) => state.userSliceReducer.notHaveForms);
  const [showDataForHaveAccount, setShowDataForHaveAccount] = useState<boolean>(notHaveForms);

  useEffect(() => {
    setShowDataForHaveAccount(notHaveForms);
  }, [notHaveForms]);

  const handleClose = () => setShowDataForHaveAccount(false);
  const handleOpen = () => setShowDataForHaveAccount(true);

  return (
    <CheckMyHaveAccountContext.Provider
      value={{ handleClose, showDataForHaveAccount, notHaveForms, handleOpen }}
      {...props}
    >
      {children}
      <FilterModalLayout
        style={sxStyle.filterModalLayout}
        modalOpen={showDataForHaveAccount}
        handleClose={handleClose}
      >
        <ModalNotFoundAccount handleClose={handleClose} />
      </FilterModalLayout>
    </CheckMyHaveAccountContext.Provider>
  );
};
