import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import './adminPage.css';

const AdminPage = () => {
  const [sections, setSections] = useState(Array(8).fill({ file: null, name: '', description: '', id: '' }));
  const [sections2, setSections2] = useState(Array(4).fill({ file: null, name: '', description: '', id: '', size: '', tall: '', rotation: '', image: null }));
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(process.env.REACT_APP_API_URL);

  const handleFileChange = (e, index) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], file: e.target.files[0] };
    setSections(newSections);
  }

  const handleNameChange = (e, index) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], name: e.target.value };
    setSections(newSections);
  }

  const handleDescriptionChange = (value, index) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], description: value };
    setSections(newSections);
  }

  const handleUpload = (index) => {
    const formData = new FormData();
    formData.append('image', sections[index].file);
    formData.append('name', sections[index].name);
    formData.append('description', sections[index].description);
    formData.append('id', index+1);

    axios.post(process.env.REACT_APP_API_URL+`/upload/${index + 1}`, formData)
      .then(res => {
        console.log(res);
        Swal.fire({
          title: 'Actualización Completa',
          text: `Cuadro ${index + 1} Fue Actualizado`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(err =>{ 
        console.log(err);
        Swal.fire({
          title: 'Error al enviar',
          text: 'No se pudo enviar el cuadro. El campo Archivo de Imagen debe tener archivo',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  const handleFileChange2 = (e, index) => {
    const newSections = [...sections2];
    newSections[index] = { ...newSections[index], file: e.target.files[0] };
    setSections2(newSections);
  }

  const handleNameChange2 = (e, index) => {
    const newSections = [...sections2];
    newSections[index] = { ...newSections[index], name: e.target.value };
    setSections2(newSections);
  }

  const handleDescriptionChange2 = (value, index) => {
    const newSections = [...sections2];
    newSections[index] = { ...newSections[index], description: value };
    setSections2(newSections);
  }

  const handleSizeChange2 = (e, index) => {
    const newSections = [...sections2];
    newSections[index] = { ...newSections[index], size: e.target.value };
    setSections2(newSections);
  }

  const handleTallChange2 = (e, index) => {
    const newSections = [...sections2];
    newSections[index] = { ...newSections[index], tall: e.target.value };
    setSections2(newSections);
  }

  const handleRotationChange2 = (e, index) => {
    const newSections = [...sections2];
    newSections[index] = { ...newSections[index], rotation: e.target.value };
    setSections2(newSections);
  }

  const handleImageChange2 = (e, index) => {
    const newSections = [...sections2];
    newSections[index] = { ...newSections[index], image: e.target.files[0] };
    setSections2(newSections);
  }

  const handleUpload2 = (index) => {
    const formData = new FormData();
    formData.append('model', sections2[index].file);
    formData.append('name', sections2[index].name);
    formData.append('description', sections2[index].description);
    formData.append('size', sections2[index].size);
    formData.append('tall', sections2[index].tall);
    formData.append('rotation', sections2[index].rotation);
    formData.append('texture', sections2[index].image);
    formData.append('id', index+1);

    axios.post(process.env.REACT_APP_API_URL+`/uploadModel/${index + 1}`, formData)
      .then(res => {
        console.log(res);
        Swal.fire({
          title: 'Actualización Completa',
          text: `Modelo ${index + 1} fue actualizado`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(err =>{ 
        console.log(err);
        Swal.fire({
          title: 'Error al enviar',
          text: 'No se pudo enviar el modelo. Los campos Modelo FBX y Textura deben tener archivo',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  return (
    <div>
      <div class='title'>Pagina de Administración</div>
      <div class='image-container'>
        <img class="rounded-image" src="../DiagramCuadro.jpg" alt="Diagrama de la habitación del museo" ></img>
      </div>
      <div>     
        <table class='update-picture-table'>
          <tbody>
            {[...Array(8)].map((_, index) => (
              <tr>
              <td colSpan='4'>
                <div class='update-picture-container'>
                  <table> 
                    <tbody>
                      <tr>
                        <td class='cuadro-title' colSpan='4'>Cuadro {index + 1}:</td>
                      </tr>
                      <tr>
                        <td class='cuadro-title-2'>Archivo de Imagen:</td>
                        <td><input type='file' onChange={(e) => handleFileChange(e, index)} /></td>
                        <td class='cuadro-title-2'>Titulo:</td>
                        <td ><input type='text' value={sections[index].name} onChange={(e) => handleNameChange(e, index)} placeholder={`Titulo ${index + 1}`} /></td>
                      </tr>
                      <tr>
                        <td colSpan='4'>
                          <div class='description-container'>
                            <ReactQuill
                              value={sections[index].description}
                              onChange={(value) => handleDescriptionChange(value, index)}
                              placeholder='Descripción'
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class='button-update' colSpan='4'><button class="button" onClick={() => handleUpload(index)}>Actualizar</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            ))}          
          </tbody>
        </table>
      </div> 
      <div class='image-container'>
        <img class="rounded-image" src="../DiagramModelo.jpg" alt="Diagrama de la habitación del museo" ></img>
      </div>
      <div>
        <table class='update-model-table'>
          <tbody>
            {[...Array(4)].map((_, index) => (
              <div class='update-model-container'>
                <tr>
                  <td class='cuadro-title' colSpan='4'>Modelo {index + 1}:</td>
                </tr>
                <tr>
                  <td class='cuadro-title-2'>Modelo FBX:</td>
                  <td><input type='file' onChange={(e) => handleFileChange2(e, index)} /></td>
                  <td class='cuadro-title-2'>Titulo:</td>
                  <td><input type='text' value={sections2[index].name} onChange={(e) => handleNameChange2(e, index)} placeholder={`Titulo ${index + 1}`} /></td>
                </tr>
                <tr>
                  <td colSpan='4'>
                    <div class='description-container'>
                      <ReactQuill
                        value={sections2[index].description}
                        onChange={(value) => handleDescriptionChange2(value, index)}
                        placeholder='Descripción'
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='cuadro-title-2'>Textura:</td>
                  <td><input type='file' onChange={(e) => handleImageChange2(e, index)} /></td>
                  <td class='cuadro-title-2'>Tamaño %:</td>
                  <td><input type='text' value={sections2[index].width} onChange={(e) => handleSizeChange2(e, index)} placeholder='100' /></td>                
                </tr>
                <tr>
                  <td class='cuadro-title-2'>Correción de Altura:</td>
                  <td><input type='text' value={sections2[index].height} onChange={(e) => handleTallChange2(e, index)} placeholder='0' /></td>
                  <td class='cuadro-title-2'>Rotación Eje Y (Grados°):</td>
                  <td><input type='text' value={sections2[index].rotation} onChange={(e) => handleRotationChange2(e, index)} placeholder='0' /></td>                
                </tr>
                <tr>
                  <td class='button-update' colSpan='4'><button class="button" onClick={() => handleUpload2(index)}>Actualizar</button></td>
                </tr>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;