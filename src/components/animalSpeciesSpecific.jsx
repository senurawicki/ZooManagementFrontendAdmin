import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import '../styles/animalSpeciesSpecific.css'; // Importing the CSS file

const AnimalSpeciesSpecific = () => {
    const navigate = useNavigate();
    const { animalSpeciesName } = useParams();
    const { animalSpeciesId } = useParams();
    const [animalSpeciesData, setAnimalSpeciesData] = useState(null);

    useEffect(() => {
        const fetchAnimalSpeciesData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/animalspecies/animalSpeciesId/${animalSpeciesId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnimalSpeciesData(data);
            } catch (error) {
                console.error('Error fetching AnimalSpecies data:', error);
            }
        };

        fetchAnimalSpeciesData();
    }, [animalSpeciesId]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/animalspecies/${animalSpeciesId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete AnimalSpecies');
            }
            navigate('/');
        } catch (error) {
            console.error('Error deleting AnimalSpecies:', error);
            // Handle the error (e.g., display an error message to the user)
        }
    };
    

    const handleEdit = () => {
        navigate(`/animalSpecies/edit/${animalSpeciesId}`);
    };

    return (
        <div>
            <h1>Animal Species Specific data</h1>
            {animalSpeciesData ? (
                <Card title="Animal Species Specific Details" className="animal-species-card">
                    <div className="details-container">
                        <p>ID: {animalSpeciesData.id}</p>
                        <p>Animal Species ID: {animalSpeciesData.animalSpeciesId}</p>
                        <p>Name: {animalSpeciesData.animalSpeciesName}</p>
                        <p>Taxonomy Kingdom: {animalSpeciesData.taxonomy_kingdom}</p>
                        <p>Taxonomy Scientific Name: {animalSpeciesData.taxonomy_scientific_name}</p>
                        <p>Group Behavior: {animalSpeciesData.characteristics_group_behavior}</p>
                        <p>Diet: {animalSpeciesData.characteristics_diet}</p>
                        <p>Skin Type: {animalSpeciesData.characteristics_skin_type}</p>
                        <p>Top Speed: {animalSpeciesData.characteristics_top_speed}</p>
                        <p>Lifespan: {animalSpeciesData.characteristics_lifespan}</p>
                        <p>Weight: {animalSpeciesData.characteristics_weight}</p>
                    </div>
                    <div className="button-container">
                        <Button label="Edit" className="edit-button" onClick={handleEdit} />
                        <Button label="Delete" className="delete-button" onClick={handleDelete} />
                    </div>
                </Card>
            ) : (
                <p>Loading Animal Species data...</p>
            )}
        </div>
    );
};

export default AnimalSpeciesSpecific;
