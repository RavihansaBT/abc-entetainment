import React, { useState } from 'react'
import { Button, Dropdown, Form, Modal } from 'semantic-ui-react'
import { createAlbum, updateAlbum } from "../services/albumService.js";

export default function AlbumForm(props) {
    const [genreValue, setGenreValue] = useState(null)
    const handlegenOption = () => {
        let arr = []

        props?.genries.forEach(e => {
            let genre = { key: e.id, value: e._id, text: e.Genre }
            arr.push(genre)
        });

        return arr;
    }

    const createAlbumHandler = async (e) => {
        e.preventDefault()
        let data = {
            title: e.target.title.value,
            artist: e.target.artist.value,
            genre: genreValue,
            releaseDate: e.target.releaseDate.value
        }
        console.log(data);
        if (data.genre !== null) {
            try {
                await createAlbum(data)
                props.setShow(false)
                props.setRefresh(!props.refresh)
            } catch (err) {
                console.log(err);
                // alert(err.response.data.message)
            }
        } else {
            alert("Required fields Empty")
        }

    }

    const updateAlbumHandler = async (e) => {
        e.preventDefault()
        let data = {
            title: e.target.title.value,
            artist: e.target.artist.value,
            genre: genreValue
        }

        console.log(data);
        if (data.genre !== null) {
            try {
                await updateAlbum(props?.albumDetails?.id, data)
                props.setShow(false)
                props.setRefresh(!props.refresh)
            } catch (err) {
                console.log(err);
                // alert(err.response.data.message)
            }
        } else {
            alert("Required fields Empty")
        }

    }


    return (
        <Modal
            onClose={() => {
                props.setShow(false)
                props.setAlbumDetails(null)
            }}
            onOpen={() => props.setShow(true)}
            open={props.show}
        >
            <Modal.Header>{props.title}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form
                        onSubmit={props?.albumDetails === null ? createAlbumHandler : updateAlbumHandler}
                    >
                        <Form.Field>
                            <label>Title</label>
                            <input defaultValue={props?.albumDetails?.title} name="title" required placeholder='Title' />
                        </Form.Field>
                        <Form.Field>
                            <label>Artist</label>
                            <input defaultValue={props?.albumDetails?.artist} name="artist" required placeholder='Artist' />
                        </Form.Field>
                        <Form.Field>
                            <label>Genre</label>
                            <Dropdown
                                defaultValue={props?.albumDetails?.genre}
                                name="genre"
                                placeholder='Select Genre'
                                fluid
                                search
                                selection
                                options={handlegenOption()}
                                onChange={(g, v) => {
                                    setGenreValue(v.value)
                                }}
                            />
                        </Form.Field>
                        {props?.albumDetails === null &&
                            <Form.Field>
                                <label>Release Date</label>
                                <input name="releaseDate" required placeholder='Release Date' />
                            </Form.Field>
                        }

                        <Button color='black' onClick={() => props.setShow(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            content="Submit"
                            labelPosition='right'
                            icon='checkmark'
                            positive
                        />
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>

            </Modal.Actions>
        </Modal>
    )
}
