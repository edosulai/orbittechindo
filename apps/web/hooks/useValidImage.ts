import { isValidImageUrl } from '@/utils';
import { useEffect, useState } from 'react';

export function useValidImage(url: string): boolean {
    const [isValidImage, setIsValidImage] = useState(false);

    useEffect(() => {
        async function checkImage() {
            const valid = await isValidImageUrl(url);
            setIsValidImage(valid);
        }
        checkImage();
    }, [url]);

    if (url === 'N/A') {
        return false;
    }

    return isValidImage;
}
