import React from 'react';
import { useParams } from 'react-router-dom';

const LayananDetail = () => {
    const { layananName } = useParams();

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getDescription = (layananName) => {
        switch (layananName.toLowerCase()) {
            case 'aransemen':
                return 'Deskripsi khusus untuk layanan aransemen.';
            case 'mixing-mastering':
                return 'Deskripsi khusus untuk layanan mixing mastering';
            case 'soundtrack':
                return 'Deskripsi khusus untuk layanan soundtrack';
            default:
                return `Detail informasi tentang layanan ${layananName} akan ditampilkan di sini.`;
        }
    };

    const capitalizedLayananName = capitalizeFirstLetter(layananName);
    const description = getDescription(layananName);

    return (
        <div>
            <div className="container mt-5 text-center">
                <h1 className="display-4">{capitalizedLayananName}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default LayananDetail;