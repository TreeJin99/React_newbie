import React, { useState } from 'react';

function UpdateContent({ data, onSubmit }) {
  const [formData, setFormData] = useState({
    id: data.id,
    title: data.title,
    desc: data.desc
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData.id, formData.title, formData.desc);
  };

  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <input 
            type="hidden"
            name="id"
            value={formData.id}
          />

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <textarea
            name="desc"
            placeholder="Description"
            value={formData.desc}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <input type="submit" value="Update" />
        </p>
      </form>
    </article>
  );
}

export default UpdateContent;