import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <div className="w-full border-b bg-black/10 border-secondary">
      <main className="md:max-w-[900px] p-4 py-2 rounded-md xl:max-w-[1500px] mx-auto">
        <Accordion type="single" collapsible className=" w-full ">
          <AccordionItem value=" item-1">
            <AccordionTrigger
              className="xl:text-[1.4rem]  text-left
                        text-[1.2rem] hover:text-primary
                        hover:text-[1.3rem] xl:hover:text-[1.5rem]"
            >
              Is the Platform Free?
            </AccordionTrigger>
            <AccordionContent>
              Yes. the platform is free to use.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger
              className="xl:text-[1.4rem] text-left
                        text-[1.2rem] hover:text-primary
                        hover:text-[1.3rem] xl:hover:text-[1.5rem]"
            >
              What is Minimum cost to participate in room?
            </AccordionTrigger>
            <AccordionContent>0.001Eth.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger
              className="xl:text-[1.4rem] text-left
                        text-[1.2rem] hover:text-primary
                        hover:text-[1.3rem] xl:hover:text-[1.5rem]"
            >
              How many Members can take part in contest?
            </AccordionTrigger>
            <AccordionContent>There is no Max limit as of now</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger
              className="xl:text-[1.4rem] text-left
                        text-[1.2rem] hover:text-primary
                        hover:text-[1.3rem] xl:hover:text-[1.5rem]"
            >
              Can one take part in multiple contest?
            </AccordionTrigger>
            <AccordionContent>Yes.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger
              className="xl:text-[1.4rem] text-left
                        text-[1.2rem] hover:text-primary
                        hover:text-[1.3rem] xl:hover:text-[1.5rem]"
            >
              What is the fee to participate in any contest ?
            </AccordionTrigger>
            <AccordionContent>The Fees is 0.002 for now</AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
