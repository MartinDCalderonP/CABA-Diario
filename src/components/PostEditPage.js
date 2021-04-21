import React, {useState, useEffect} from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';
import {TextInput, Select, Textarea} from 'react-materialize';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import Swal from 'sweetalert2';
import FormPage from './FormPage';
import ThisButton from './ThisButton';

export default (props)=>{
    const [redirect, setRedirect]=useState(false);

    const [título, setTítulo]=useState('');
    const [sección, setSección]=useState('');
    const [imagenPrevia, setImagenPrevia]=useState('');
    const [imagen, setImagen]=useState('');
    const [pieDeImagen, setPieDeImagen]=useState('');
    const [créditoDeImagen, setCréditoDeImagen]=useState('');
    const [texto, setTexto]=useState('');

    const handleTitleChange=(event)=>{
        setTítulo(event.target.value);
    }
    
    const handleSectionChange=(event)=>{
        setSección(event.target.value);
    }

    const handleImageChange=(event)=>{
        setImagen(event.target.files[0]);
        setImagenPrevia(URL.createObjectURL(event.target.files[0]));
    }

    const handleImageFooterChange=(event)=>{
        setPieDeImagen(event.target.value);
    }

    const handleImageCreditChange=(event)=>{
        setCréditoDeImagen(event.target.value);
    }

    const handleTextChange=(event, editor) => {
        const data = editor.getData();
        setTexto(data);
    }

    const handlePost=()=>{
        const formData=new FormData();

        formData.append('Título', título);
        formData.append('Sección_ID', sección);
        formData.append('Imagen', imagen);
        formData.append('Pie_de_Imagen', pieDeImagen);
        formData.append('Crédito_de_Imagen', créditoDeImagen);
        formData.append('Texto', texto);

        let baseURL='https://caba-diario-backend.herokuapp.com';

        let url=`${baseURL}/notas`;

        let method='POST';

        if (id) {
            url += '/' + id;
            method = 'PUT';
        }

        fetch(url, {
            method: method,
            body: formData,
            credentials: 'include'
        }).then(
            response => response.json()
        ).then(
            data => {
                if (data.status==='Ok.') {
                    Swal.fire({
                        text: data.message,
                        icon: 'success'
                    })
                    
                    setRedirect(true);
                } else {
                    Swal.fire({
                        text: data.message,
                        icon: 'error'
                    })
                }
            }
        ).catch(
            error => {
                console.log('Error');
        });
    }

    const [secciones, setSecciones]=useState([]);

    let {id}=useParams();

    useEffect(
        ()=>{
            fetch(`${baseURL}/secciones`).then(
                response => response.json()
            ).then(
                data =>{
                    setSecciones(data);
                }
            )

            id &&
                fetch(`${baseURL}/notas/autor/todas/` + id).then(
                    response=>response.json()
                ).then(
                    data=>{
                        setTítulo(data.Nota_Título);
                        setSección(data.Nota_Sección_ID);
                        setImagenPrevia(data.Nota_Imagen);
                        setPieDeImagen(data.Nota_PieDeImagen);
                        setCréditoDeImagen(data.Nota_CréditoDeImagen);
                        setTexto(data.Nota_Texto);
                    }
                )
        }, [id]
    )

    let previewImgStyle={
        height: '25vh'
    }

    let separatorDivStyle={
        minHeight: '10px'
    }

    let rememberPStyle={
        fontSize: '1.2rem'
    }

    return(
        !redirect ?
            <div
                className='container'
            >
                <FormPage
                    title={
                        !props.edit ?
                            'Nueva Nota'
                        :
                            'Editar Nota'
                    }
                >
                    <TextInput
                        id="title-input"
                        data-length={200}
                        placeholder="Escribe aquí el título de la nota."
                        value={título}
                        onChange={handleTitleChange}
                    />
                    
                    <Select
                        id="section-select"
                        multiple={false}
                        options={{
                            classes: '',
                            dropdownOptions: {
                                alignment: 'left',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: true,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 250
                            }
                        }}
                        value={String(sección)}
                        onChange={handleSectionChange}
                    >
                        <option
                            disabled
                            value=""
                        >
                            Elija una sección.
                        </option>

                        {
                            secciones.map(sección=>{
                                return(
                                    <option
                                        key={sección.Sección_ID}
                                        value={sección.Sección_ID}
                                    >
                                        {sección.Sección_Nombre}
                                    </option>
                                )
                            })
                        }
                    </Select>

                    {
                        imagenPrevia &&
                            <div>
                                <img
                                    src={imagenPrevia}
                                    alt='Imagen Previa'
                                    style={previewImgStyle}
                                />
                            </div>
                    }

                    <TextInput
                        id="img-input"
                        label="Imagen"
                        type="file"
                        onChange={handleImageChange}
                    />

                    <TextInput
                        id="imgCredit-input"
                        data-length={200}
                        placeholder="Escribe aquí quien merece el crédito de la imagen."
                        value={créditoDeImagen}
                        onChange={handleImageCreditChange}
                    />

                    <Textarea
                        id='imgFooter-input'
                        data-length={500}
                        placeholder="Escribe aquí el pie de la imagen."
                        value={pieDeImagen}
                        onChange={handleImageFooterChange}
                    />

                    <div
                        style={separatorDivStyle}
                    />

                    <CKEditor
                        config={{language: 'es'}}
                        editor={ClassicEditor}
                        data={texto}
                        onChange={handleTextChange}
                    />

                    {
                        props.newPost ?
                            (
                                !props.return ?
                                    <p
                                        style={rememberPStyle}
                                    >
                                        Recuerde que su nota será revisada por el editor de la sección antes de ser publicada en la página. Una vez revisada y publicada, ya no podrá editarse.
                                    </p>
                            :
                                props.return
                            )
                        :
                            <>                    
                                <Textarea
                                    id='return-input'
                                    data-length={1000}
                                    placeholder="Escribe aquí una devolución al autor."
                                />

                                <p
                                    style={rememberPStyle}
                                >
                                    Procure ser lo más claro y conciso posible a la hora de redactar su devolución.
                                </p>
                            </>
                    }

                    <Link
                        to={props.newPost ? '/Mis-Notas' : '/Notas-a-Editar'}
                    >
                        <ThisButton>
                            Cancelar
                        </ThisButton>
                    </Link>
                    
                    {
                        props.newPost ?
                                <ThisButton
                                    onClick={handlePost}
                                >
                                    {
                                        !props.edit ?
                                            'Nota a revisión'
                                        :
                                            'Editar nota'
                                    }
                                </ThisButton>
                        :
                            <>
                                <ThisButton>
                                    Devolver nota
                                </ThisButton>

                                <ThisButton>
                                    Autorizar publicación
                                </ThisButton>
                            </>
                    }
                </FormPage>
            </div>
        :
            <Redirect to='/Mis-Notas'/>
    )
}