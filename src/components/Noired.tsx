import { ActionIcon, Alert, Button, Group, Paper, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { Copy, ExternalLink } from "tabler-icons-react";

const Noired = (props: any) => {
  const clipboard = useClipboard({ timeout: 500 });
  return (
    <>
      <Paper sx={{ maxWidth: "100%", minWidth: "55%" }}>
        <Alert color="gray" py={5} px={5}>
          <Group
            px="xs"
            py={1}
            align="center"
            position="apart"
            spacing="xs"
            noWrap
          >
            <Text size="sm">{props.path}</Text>
            <Group spacing="xs" position="center" align="center" noWrap>
              <Button
                size="xs"
                leftIcon={<Copy />}
                variant={clipboard.copied ? "outline" : "default"}
                color="gray"
                onClick={() => clipboard.copy(props.path)}
              >
                {clipboard.copied ? "Copied" : "Copy"}
              </Button>
              <ActionIcon<"a">
                variant="default"
                target="_blank"
                component="a"
                href={props.path}
              >
                <ExternalLink />
              </ActionIcon>
            </Group>
          </Group>
        </Alert>
      </Paper>
    </>
  );
};

export default Noired;
