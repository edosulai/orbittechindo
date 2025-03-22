'use client';

import { Image, Text, View } from 'react-native';
import { Anchor } from '../atoms';

export function Footer() {
    return (
        <View className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            <Anchor
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                url="https://github.com/edosulai/orbittechindo"
            >
                <Image
                    aria-hidden
                    src="/file.svg"
                    alt="File icon"
                    width={16}
                    height={16}
                />
                <Text>Source Code</Text>
            </Anchor>
            <Anchor
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                url="https://edosulai.github.io"
            >
                <Image
                    aria-hidden
                    src="/globe.svg"
                    alt="Globe icon"
                    width={16}
                    height={16}
                />
                <Text>Go to edosulai.github.io →</Text>
            </Anchor>
        </View>
    );
}
