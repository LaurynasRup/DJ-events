import Layout from '@/components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

const AddEvent = () => {
	return (
		<Layout title="Add New Event">
			<h1>Add Event</h1>
		</Layout>
	);
};

export default AddEvent;
