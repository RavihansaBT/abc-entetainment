import React, { useEffect, useState } from 'react'
import { Button, Container, Divider, Icon, Input, Table } from 'semantic-ui-react'
import AlbumForm from '../components/AlbumForm'
import { getAlbums, getGenre, deleteAlbum, searchAlbum, getAlbumById } from "../services/albumService.js";

export default function AlbumScreen() {
    const [openModel, setOpenModel] = useState(false)
    const [albumData, setAlbumData] = useState([])
    const [genries, setGenries] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [albumDetails, setAlbumDetails] = useState(null)

    useEffect(() => {
        getAllAlbums()
        getAllGenries()
    }, [refresh])

    const getAllAlbums = async () => {
        try {
            const albums = await getAlbums()
            setAlbumData(albums.data);
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const getByIdHandler = async (id) => {
        try {
            const albums = await getAlbumById(id)

            setAlbumDetails(albums.data);
        } catch (err) {
            alert(err.response.data.message)
        }
    }


    const searchAlbumsHandler = async (q) => {
        try {
            const albums = await searchAlbum(q)
            setAlbumData(albums.data);
        } catch (err) {
            alert(err.response.data.message)
        }
    }


    const getAllGenries = async () => {
        try {
            const gens = await getGenre()
            setGenries(gens.data);
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const deleteAlbumHandler = async (id) => {
        try {
            console.log(id);
            await deleteAlbum(id)
            setRefresh(!refresh)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div>
            <Container textAlign='center'><h1>ABC-Entertainments</h1></Container>
            <Divider />
            <Input size='small' action={{ icon: 'search' }} placeholder='Search...'
                onChange={(e, v) => searchAlbumsHandler(v.value)}
            />
            &nbsp;&nbsp;&nbsp;
            <Button
                positive
                onClick={() => setOpenModel(true)}
            >+</Button>
            <Divider />
            <Container>


                <Table >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Artist</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {albumData.map((item, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{item.title}</Table.Cell>
                                <Table.Cell>{item.artist}</Table.Cell>
                                <Table.Cell>
                                    <div>
                                        <Button icon labelPosition='left'
                                            onClick={() => {
                                                setOpenModel(true)
                                                getByIdHandler(item.id)
                                            }}
                                        >
                                            <Icon name='edit' />
                                            View & Edit
                                        </Button>
                                        <Button icon labelPosition='left'
                                            onClick={() => deleteAlbumHandler(item.id)}
                                        >
                                            <Icon name='delete' />
                                            Delete
                                        </Button>
                                    </div>

                                </Table.Cell>

                            </Table.Row>
                        ))}

                    </Table.Body>


                </Table>
            </Container>

            <AlbumForm
                albumDetails={albumDetails}
                setAlbumDetails={setAlbumDetails}
                show={openModel}
                setShow={setOpenModel}
                title={"Create Album"}
                genries={genries}
                refresh={refresh}
                setRefresh={setRefresh}
            />
        </div>
    )
}
