import { Box, Skeleton, Stack, styled } from "@mui/material"

const Flex = styled(Box)`
    display: flex;
    gap: 1rem
`

const Wrapper = styled(Stack)`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`

const Proxy = styled(Skeleton)`
    background-color: var(--skeleton);
`

const UserLoading = () => {
    return (
        <Wrapper>
            <Flex>
                <Proxy animation={false} variant="circular" width={"45px"} height={"45px"} />
                <Box display={"flex"} flexDirection={"column"} gap={".1rem"}>
                    <Proxy animation={false} width={"120px"} variant="text" sx={{ fontSize: '1rem' }} />
                    <Proxy  animation={false} width={"80px"} variant="text" style={{backgroundColor: "var(--skeleton)"}} sx={{ fontSize: '1rem' }} />
                </Box>
            </Flex>
            <Flex>
                <Proxy animation={false} variant="circular" width={"45px"} height={"45px"} />
                <Box display={"flex"} flexDirection={"column"} gap={".1rem"}>
                    <Proxy animation={false} width={"120px"} variant="text" sx={{ fontSize: '1rem' }} />
                    <Proxy  animation={false} width={"80px"} variant="text" sx={{ fontSize: '1rem' }} />
                </Box>
            </Flex>
            <Flex>
                <Proxy animation={false} variant="circular" width={"45px"} height={"45px"} />
                <Box display={"flex"} flexDirection={"column"} gap={".1rem"}>
                    <Proxy animation={false} width={"120px"} variant="text" sx={{ fontSize: '1rem' }} />
                    <Proxy  animation={false} width={"80px"} variant="text" sx={{ fontSize: '1rem' }} />
                </Box>
            </Flex>
            <Flex>
                <Proxy animation={false} variant="circular" width={"45px"} height={"45px"} />
                <Box display={"flex"} flexDirection={"column"} gap={".1rem"}>
                    <Proxy animation={false} width={"120px"} variant="text" sx={{ fontSize: '1rem' }} />
                    <Proxy  animation={false} width={"80px"} variant="text" sx={{ fontSize: '1rem' }} />
                </Box>
            </Flex>
            <Flex>
                <Proxy animation={false} variant="circular" width={"45px"} height={"45px"} />
                <Box display={"flex"} flexDirection={"column"} gap={".1rem"}>
                    <Proxy animation={false} width={"120px"} variant="text" sx={{ fontSize: '1rem' }} />
                    <Proxy  animation={false} width={"80px"} variant="text" sx={{ fontSize: '1rem' }} />
                </Box>
            </Flex>
            <Flex>
                <Proxy animation={false} variant="circular" width={"45px"} height={"45px"} />
                <Box display={"flex"} flexDirection={"column"} gap={".1rem"}>
                    <Proxy animation={false} width={"120px"} variant="text" sx={{ fontSize: '1rem' }} />
                    <Proxy  animation={false} width={"80px"} variant="text" sx={{ fontSize: '1rem' }} />
                </Box>
            </Flex>
        </Wrapper>
    )
}


export default UserLoading;