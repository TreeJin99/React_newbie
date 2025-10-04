import React, { useState } from 'react';
import './App.css';
import TOC from './components/TOC';
import ReadContent from './components/Content/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/Content/CreateContent';
import UpdateContent from './components/Content/UpdateContent';
import { MODE } from './constants/modes';


function App() {
  const [mode, setMode] = useState(MODE.WELCOME);
  const [selectedContentId, setSelectedContentId] = useState(2);
  const [maxContentId, setMaxContentId] = useState(3);
  const [contents, setContents] = useState([
    { id: 1, title: "HTML", desc: "HTML is for information" },
    { id: 2, title: "CSS", desc: "CSS is for design" },
    { id: 3, title: "JS", desc: "JavaScript is for interactive" }
  ]);

  const welcomeContent = { title: "welcome", desc: "Hello, React !~!!~!" };
  const subject = { title: "web", subTitle: "world wide web!!!!" };

  // 선택된 콘텐츠 찾기
  const getSelectedContent = () => {
    return contents.find(content => content.id === selectedContentId);
  };

  // 콘텐츠 생성
  const handleCreate = (title, desc) => {
    const newId = maxContentId + 1;
    const newContent = { id: newId, title, desc };
    
    setContents([...contents, newContent]);
    setMaxContentId(newId);
    setMode(MODE.READ);
    setSelectedContentId(newId);
  };

  // 콘텐츠 수정
  const handleUpdate = (id, title, desc) => {
    const updatedContents = contents.map(content =>
      content.id === id ? { id, title, desc } : content
    );
    
    setContents(updatedContents);
    setMode(MODE.READ);
  };

  // 삭제 핸들러
  const handleDelete = () => {
    const selectedContent = getSelectedContent();
    
    if (!selectedContent) {
      alert('삭제할 콘텐츠를 선택해주세요.');
      return;
    }

    if (window.confirm(`"${selectedContent.title}"을(를) 정말 삭제하시겠습니까?`)) {
      const updatedContents = contents.filter(
        content => content.id !== selectedContentId
      );
      
      setContents(updatedContents);
      setMode(MODE.WELCOME);
      alert('삭제되었습니다.');
    }
  };

  // 모드 변경 핸들러 (DELETE 처리 추가)
  const handleChangeMode = (newMode) => {
    if (newMode === MODE.DELETE) {
      handleDelete();
    } else {
      setMode(newMode);
    }
  };

  // 현재 모드에 따른 콘텐츠 렌더링
  const renderContent = () => {
    switch (mode) {
      case MODE.WELCOME:
        return <ReadContent title={welcomeContent.title} desc={welcomeContent.desc} />;
      
      case MODE.READ:
        const selectedContent = getSelectedContent();
        return selectedContent ? (
          <ReadContent title={selectedContent.title} desc={selectedContent.desc} />
        ) : null;
      
      case MODE.CREATE:
        return <CreateContent onSubmit={handleCreate} />;
      
      case MODE.UPDATE:
        const contentToUpdate = getSelectedContent();
        return contentToUpdate ? (
          <UpdateContent data={contentToUpdate} onSubmit={handleUpdate} />
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Subject
        title={subject.title}
        subTitle={subject.subTitle}
        onChangePage={() => setMode(MODE.WELCOME)}
      />
      
      <TOC
        data={contents}
        onChangePage={(id) => {
          setMode(MODE.READ);
          setSelectedContentId(Number(id));
        }}
      />
      
      <Control onChangeMode={handleChangeMode} />
      
      {renderContent()}
    </div>
  );
}

export default App;