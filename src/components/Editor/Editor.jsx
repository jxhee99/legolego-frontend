import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['link', 'image'],
];

const modules = {
  toolbar: {
    container: toolbarOptions,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'list',
  'bullet',
  'indent',
  'background',
  'color',
  'link',
  'image',
  'video',
  'width',
];

const Editor = ({ ...rest }) => {
  const quillRef = useRef();
  const [value, setValue] = useState('');

  // const handleValue = (content, delta, source, editor) => {
  //   // content: 현재 에디터의 내용
  //   console.log('Content:', content);

  //   // editor: 에디터 인스턴스
  //   const html = editor.getHTML(); // HTML 포맷으로 가져오기
  //   setValue(html);
  // };

  const handleValue = (e) => {
    setValue(e);
  };

  return (
    <>
      <ReactQuill
        {...rest}
        modules={modules}
        formats={formats}
        ref={quillRef}
        theme='snow'
        placeholder='내용을 입력하세요.'
        style={{ width: '600px', height: '300px' }}
        value={value}
        onChange={handleValue}
      />
    </>
  );
};

export default Editor;
