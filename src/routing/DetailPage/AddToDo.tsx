import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CategoriesAtom, I_WeeklyAtoms, WeeklyAtoms } from "../../Atoms";
import { Boss_data, I_WeeklyContentAtoms, WeeklyContentAtoms } from "../../modules/datas/ContentAtoms";
import AddWeeklyForm from "./AddForms/AddWeeklys";
import AddBossForm from "./AddForms/AddBoss";
import AddCustomForms from "./AddForms/AddCustoms";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0%;
    right: 0%;
    position: absolute;
    background-color: rgba(10, 10, 10, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 30em;
    height: 38em;
    background-color: rgba(245, 245, 245, 1.0);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
`;

const ToDoHeader = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 8px;
`;

const ToDoBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export interface I_AddToDoParams {
    setHide: Function;
};

interface I_Forms {
    ToDoSelect?: string;
}

function AddToDo({setHide}: I_AddToDoParams){
    const {register, handleSubmit} = useForm();
    const NowCategories = useRecoilValue(CategoriesAtom);

    const [WeeklyContents, setContents] = useRecoilState(WeeklyContentAtoms);

    const setWeeklyData = useSetRecoilState(WeeklyAtoms);
    //const [WeeklyData, setWeeklyData] = useRecoilState(WeeklyAtoms);

    const onValid = ({ToDoSelect}: I_Forms) => {
       const idx = WeeklyContents.findIndex((data) => data.Name === ToDoSelect);
       const targets = WeeklyContents[idx];

       const ConvertData: I_WeeklyContentAtoms = {
            Id: targets.Id,
            Name: targets.Name,
            isAdds: true
       };
       setContents((oldItems) => [
        ...oldItems.slice(0, idx),
        ConvertData,
        ...oldItems.slice(idx + 1)
       ]);

       const AddWeeklyData: I_WeeklyAtoms = {
            contentsNm: ToDoSelect,
            isDone: false
       };
       setWeeklyData((oldItems) => [...oldItems, AddWeeklyData]);
       setHide(false);
    };
    
    return (
        <Wrapper>
            <Container>
                <ToDoHeader>
                    <button onClick={() => setHide(false)}>취소</button>
                </ToDoHeader>
                <ToDoBody>
                    <div>{NowCategories.name}</div>
                    <div className="ToDoSelect">
                        {NowCategories.Id === "Weeklys" ? <AddWeeklyForm setHide={setHide}/> : null}
                        {NowCategories.Id === "Boss" ? <AddBossForm /> : null}
                        {NowCategories.Id === "Customs" ? <AddCustomForms /> : null}
                    </div>
                </ToDoBody>
            </Container>
        </Wrapper>
    );
};

export default AddToDo;