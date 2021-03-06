import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { motion } from "framer-motion"
import {
    Table,
    Button,
    Section
  } from '../components/Style';

function ShowList() {    
    const [items, setItems] = useState([]);

    useEffect( () => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data = await fetch('http://localhost:5000/posts');
        const items = await data.json();
        setItems(items);
    };

    return(
        <motion.div animate={{ scale:0.97}}transition={{ duration: 0.5 }}>
        <Section>
            {
            items.map(item => (
                <Table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        {item.title}
                        </td>
                        <td>
                        {item.content}. . .
                        </td>
                        <td>
                        <Link to={`/item/${item['_id']}`}>
                        <Button backgroundColor="#04AA6D">Read More</Button>
                        </Link>
                        </td>
                    </tr>
                </tbody>
            </Table>
            )
                )
            }
        </Section>
        </motion.div>
    );
}

export default ShowList;