import React from 'react';
import CKEditor from 'ckeditor4-react';
CKEditor.editorUrl = 'https://cdn.ckeditor.com/4.13.1/full/ckeditor.js';


const WYSIWYGEditor = ({content, setContent}) => {

    return (
        <CKEditor
            config={{
                contentsCss: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
                allowedContent: true
            }}
            data={content}
            onChange={(event) => {
                setContent(event.editor.getData());
            }}

            onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
        />

    );
};

export default WYSIWYGEditor;